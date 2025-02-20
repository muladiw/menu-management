import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MenuTableTestHelper } from '../src/test/MenuTableTestHelper';

describe('/api e2e', () => {
  let app: INestApplication;
  afterAll(async () => {
    await MenuTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when POST /menu', () => {
    it('/menu POST', async () => {
      const payload = {
        name: 'name',
        depth: 1,
      };
      const response = await request(app.getHttpServer())
        .post('/menu')
        .send(payload);

      expect(response.statusCode).toEqual(201);

      const result = await MenuTableTestHelper.getMenuByWhere({
        name: payload.name,
      });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toEqual(payload.name);
      expect(result[0].depth).toEqual(payload.depth);
      expect(result[0].id_parent).toEqual(null);
    });
    it('should response 400/401 and show correct message', async () => {
      // Arrange
      const errorTables = [
        {
          payload: {},
          message: 'Name required',
          errorCode: 400,
        },
      ];
      const result = [];
      // Action
      for (let i = 0; i < errorTables.length; i += 1) {
        const { payload, token: accessToken }: any = errorTables[i];

        result.push(
          request(app.getHttpServer())
            .post('/menu')
            .send(payload)
            .set('Authorization', `Bearer ${accessToken}`),
        );
      }
      // Assert
      const responses = await Promise.all(result);
      for (let i = 0; i < errorTables.length; i += 1) {
        const { message, errorCode } = errorTables[i];

        expect(responses[i].statusCode).toEqual(errorCode || 400);
        expect(responses[i].body.pesan).toEqual(message);
      }
    });
  });
});
