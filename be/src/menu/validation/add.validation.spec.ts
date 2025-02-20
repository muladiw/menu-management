import { ADD } from './menu.validation';

describe('ADD', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action
    const result = ADD.safeParse(payload);

    // Assert
    expect(JSON.parse(result.error.message)[0].message).toEqual(
      'Name required',
    );
  });
  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: [123],
    };

    // Action
    const result = ADD.safeParse(payload);

    // Assert
    expect(JSON.parse(result.error.message)[0].message).toEqual(
      'Name must text',
    );
  });
  it('should create entities correctly', () => {
    // Arrange
    const payload = {
      name: 'name',
      depth: 1,
      idParent: 'idParent',
    };

    // Action
    const result = ADD.safeParse(payload);

    // Assert
    expect(result.data).toEqual(payload);
  });
});
