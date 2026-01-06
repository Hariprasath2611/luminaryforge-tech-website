/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: companyservices
 * Interface for CompanyServices
 */
export interface CompanyServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  capabilities?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}
