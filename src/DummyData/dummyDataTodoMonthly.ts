const currentDate = new Date().toLocaleDateString();
const currentTime = new Date().toLocaleTimeString();

export const dummyDataTodoMonthly = [
    // Food
    { id: Date.now().toString(), title: "Grocery Shopping", amount: "1500", category: "Food", currentDate, currentTime },
    { id: (Date.now() + 1).toString(), title: "Restaurant Dinner", amount: "850", category: "Food", currentDate, currentTime },
    { id: (Date.now() + 2).toString(), title: "Snacks & Drinks", amount: "200", category: "Food", currentDate, currentTime },
    { id: (Date.now() + 3).toString(), title: "Cafe Coffee", amount: "120", category: "Food", currentDate, currentTime },
    { id: (Date.now() + 4).toString(), title: "Fast Food Takeaway", amount: "450", category: "Food", currentDate, currentTime },

    // Transport
    { id: (Date.now() + 5).toString(), title: "Bus Pass", amount: "600", category: "Transport", currentDate, currentTime },
    { id: (Date.now() + 6).toString(), title: "Uber Ride", amount: "320", category: "Transport", currentDate, currentTime },
    { id: (Date.now() + 7).toString(), title: "Fuel Refill", amount: "1200", category: "Transport", currentDate, currentTime },
    { id: (Date.now() + 8).toString(), title: "Train Ticket", amount: "90", category: "Transport", currentDate, currentTime },
    { id: (Date.now() + 9).toString(), title: "Taxi Fare", amount: "400", category: "Transport", currentDate, currentTime },

    // Rent
    { id: (Date.now() + 10).toString(), title: "Monthly Apartment Rent", amount: "12000", category: "Rent", currentDate, currentTime },
    { id: (Date.now() + 11).toString(), title: "Storage Unit Rent", amount: "1500", category: "Rent", currentDate, currentTime },
    { id: (Date.now() + 12).toString(), title: "Office Space Rent", amount: "8000", category: "Rent", currentDate, currentTime },
    { id: (Date.now() + 13).toString(), title: "Shop Rent", amount: "5000", category: "Rent", currentDate, currentTime },
    { id: (Date.now() + 14).toString(), title: "Guest House Rent", amount: "2000", category: "Rent", currentDate, currentTime },

    // Bills
    { id: (Date.now() + 15).toString(), title: "Electricity Bill", amount: "900", category: "Bills", currentDate, currentTime },
    { id: (Date.now() + 16).toString(), title: "Water Bill", amount: "250", category: "Bills", currentDate, currentTime },
    { id: (Date.now() + 17).toString(), title: "Internet Bill", amount: "800", category: "Bills", currentDate, currentTime },
    { id: (Date.now() + 18).toString(), title: "Mobile Recharge", amount: "399", category: "Bills", currentDate, currentTime },
    { id: (Date.now() + 19).toString(), title: "Gas Bill", amount: "600", category: "Bills", currentDate, currentTime },

    // Entertainment
    { id: (Date.now() + 20).toString(), title: "Netflix Subscription", amount: "499", category: "Entertainment", currentDate, currentTime },
    { id: (Date.now() + 21).toString(), title: "Movie Tickets", amount: "300", category: "Entertainment", currentDate, currentTime },
    { id: (Date.now() + 22).toString(), title: "Concert Ticket", amount: "1200", category: "Entertainment", currentDate, currentTime },
    { id: (Date.now() + 23).toString(), title: "Gaming Purchase", amount: "700", category: "Entertainment", currentDate, currentTime },
    { id: (Date.now() + 24).toString(), title: "Amusement Park", amount: "1500", category: "Entertainment", currentDate, currentTime },

    // Shopping
    { id: (Date.now() + 25).toString(), title: "New Shoes", amount: "2500", category: "Shopping", currentDate, currentTime },
    { id: (Date.now() + 26).toString(), title: "Smartphone", amount: "15000", category: "Shopping", currentDate, currentTime },
    { id: (Date.now() + 27).toString(), title: "Clothing", amount: "1200", category: "Shopping", currentDate, currentTime },
    { id: (Date.now() + 28).toString(), title: "Kitchen Appliances", amount: "3500", category: "Shopping", currentDate, currentTime },
    { id: (Date.now() + 29).toString(), title: "Books Purchase", amount: "800", category: "Shopping", currentDate, currentTime },

    // Health
    { id: (Date.now() + 30).toString(), title: "Pharmacy Medicine", amount: "300", category: "Health", currentDate, currentTime },
    { id: (Date.now() + 31).toString(), title: "Doctor Consultation", amount: "500", category: "Health", currentDate, currentTime },
    { id: (Date.now() + 32).toString(), title: "Health Supplements", amount: "900", category: "Health", currentDate, currentTime },
    { id: (Date.now() + 33).toString(), title: "Gym Membership", amount: "1500", category: "Health", currentDate, currentTime },
    { id: (Date.now() + 34).toString(), title: "Lab Tests", amount: "700", category: "Health", currentDate, currentTime },

    // Education
    { id: (Date.now() + 35).toString(), title: "Online Course", amount: "2500", category: "Education", currentDate, currentTime },
    { id: (Date.now() + 36).toString(), title: "School Fees", amount: "12000", category: "Education", currentDate, currentTime },
    { id: (Date.now() + 37).toString(), title: "Tuition Fees", amount: "3000", category: "Education", currentDate, currentTime },
    { id: (Date.now() + 38).toString(), title: "Stationery", amount: "500", category: "Education", currentDate, currentTime },
    { id: (Date.now() + 39).toString(), title: "Exam Fees", amount: "1500", category: "Education", currentDate, currentTime },

    // Others
    { id: (Date.now() + 40).toString(), title: "Charity Donation", amount: "1000", category: "Others", currentDate, currentTime },
    { id: (Date.now() + 41).toString(), title: "Gift Purchase", amount: "800", category: "Others", currentDate, currentTime },
    { id: (Date.now() + 42).toString(), title: "Pet Care", amount: "600", category: "Others", currentDate, currentTime },
    { id: (Date.now() + 43).toString(), title: "Household Items", amount: "1200", category: "Others", currentDate, currentTime },
    { id: (Date.now() + 44).toString(), title: "Miscellaneous", amount: "500", category: "Others", currentDate, currentTime },
];

