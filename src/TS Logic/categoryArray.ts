interface Category {
  categoryLabel: string,
  categoryDescription: string,
  categoryColor: string,
}


export const categoryArray: Category[] = [
  {
    categoryLabel: "Food",
    categoryDescription: "Groceries, restaurants, snacks",
    categoryColor: '#38b000',
  },
  {
    categoryLabel: "Transport",
    categoryDescription: "Bus, train, fuel, Uber",
    categoryColor: '#ffea00',
  },
  {
    categoryLabel: "Rent",
    categoryDescription: "Monthly room/house rent",
    categoryColor: '#00438f',
  },
  {
    categoryLabel: "Entertainment",
    categoryDescription: "Movies, games, Netflix",
    categoryColor: '#1b263b',
  },
  {
    categoryLabel: "Bills",
    categoryDescription: "Electricity, water, phone, internet",
    categoryColor: '#0aff99',
  },
  {
    categoryLabel: "Shopping",
    categoryDescription: "Clothes, gadgets, online shopping",
    categoryColor: '#ffb3c1',
  },
  {
    categoryLabel: "Health",
    categoryDescription: "Medicine, doctor visits, gym",
    categoryColor: '#f77f00',
  },
  {
    categoryLabel: "Education",
    categoryDescription: "Courses, books, tuition",
    categoryColor: '#a68a64',
  },
  {
    categoryLabel: "Others",
    categoryDescription: "Anything that doesn’t fit above",
    categoryColor: '#90e0ef',
  },
];
