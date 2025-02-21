class MenuCommon {
  name: string;
  depth: number;
}

export class AddMenu extends MenuCommon {
  idParent?: string;
}

export class AddedMenu extends MenuCommon {
  id: string;
}

export class FilterMenu {
  idParent?: string;
}
