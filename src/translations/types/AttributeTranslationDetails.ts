/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LanguageCodeEnum, AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AttributeTranslationDetails
// ====================================================

export interface AttributeTranslationDetails_translation_ProductTranslatableContent {
  __typename: "ProductTranslatableContent" | "CollectionTranslatableContent" | "CategoryTranslatableContent" | "AttributeValueTranslatableContent" | "ProductVariantTranslatableContent" | "PageTranslatableContent" | "ShippingMethodTranslatableContent" | "SaleTranslatableContent" | "VoucherTranslatableContent" | "MenuItemTranslatableContent";
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_translation {
  __typename: "AttributeTranslation";
  id: string;
  name: string;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
  inputType: AttributeInputTypeEnum | null;
}

export interface AttributeTranslationDetails_translation_AttributeTranslatableContent {
  __typename: "AttributeTranslatableContent";
  translation: AttributeTranslationDetails_translation_AttributeTranslatableContent_translation | null;
  attribute: AttributeTranslationDetails_translation_AttributeTranslatableContent_attribute | null;
}

export type AttributeTranslationDetails_translation = AttributeTranslationDetails_translation_ProductTranslatableContent | AttributeTranslationDetails_translation_AttributeTranslatableContent;

export interface AttributeTranslationDetails {
  translation: AttributeTranslationDetails_translation | null;
}

export interface AttributeTranslationDetailsVariables {
  id: string;
  language: LanguageCodeEnum;
}
