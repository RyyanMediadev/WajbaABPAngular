
export interface CreateUpdateItemAddonDto {
  addonName?: string;
  additionalPrice: number;
  itemId: number;
}

export interface ItemAddonDto {
  id: number;
  addonName?: string;
  additionalPrice: number;
  itemId: number;
}
