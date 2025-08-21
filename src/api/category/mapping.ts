import { capitalizeFirstLetter } from "@/lib/utils";
import type { SelectCategoryData } from "@/types";

export function mapCategories(res: any): SelectCategoryData[] {
  return res.map((category: string) => ({
      label: capitalizeFirstLetter(category).replace('-', ' '),
      value: category,
    })
  )
}
