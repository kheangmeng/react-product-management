import type { Category } from "@/types";

export function mapCategories(res: any): string[] {
  return res.categories?.map((category: Category) => (category.name))
}
