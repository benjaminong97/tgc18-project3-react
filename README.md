# **Gaming Mouse Online Store - Superior Sensors**

Access the site for customers [here](https://superiorsensorsmain.netlify.app/).
- Login: gtan@gmail.com
- Password: gtan123
<br/>
Access the site for shop owners (Administrator) [here](https://superior-sensors.herokuapp.com/).
- Login: admin@superior.org
- Password: admin123

**Credits:**
1. Flaticon (https://www.flaticon.com/) for all icons used in the navbar of this project.
2. Gaming mouse brands: Razer, Logitech, Roccat, Steelseries, Glorious, HyperX and Corsair for their product images, information, as well as Razer's advertising video used in the home page of the project. 

## 1. Project Summary
### **Background** 
An online e-commerce store specialising in the sale of gaming mice.

### **Organisational Goals & Project Justification**
* Gaming mice offer an increase in performance and ergonomics for those interested in increasing their game. 
* There are many considerations a customer may have in selecting such a product, and current e commerce websites do not allow for specialised filtering of gaming mice, this project aims to target this gap. 


### **Logical Schema Diagram**

<br/>

## 2. UI/UX

### **User Stories**
| User Story                                                                                                                                	| Acceptance Criteria                                                                                                  	|
|-------------------------------------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------	|
| As a person getting into gaming, I would like to look for a good performing gaming mouse which fits my budget and gaming interest. 	| Website helps users to search for suitable products based on their interests through the use of search filters 	|
| As an avid gamer, I would like to know more about available gaming mice and their techinical specifications and performance.                     	| Website contains useful information on the different types of gaming mice.  	|

### **5 Planes of UI/UX**
### 1. Strategy
1. **Target Users**: As gaming becomes more and more popular, users getting into gaming will be looking for appropriate gear for their newfound gaming needs. In additon, current gamers looking for specific attributes for their gaming mice (such as gaming type or connectivity).
2. **Users Needs**: To easily search and find gaming mice that provides the best performance for their gaming needs and budget. 
3. **Site Objective**:
- help users search for gaming mice based on their gaming needs
- help users search for gaming mice based on their budget

### 2. Scope
1. **Functional Requirements (for customers):**
    - Account registration and login
    - Browse products, search products and view each product and product details
    - add products to shopping cart
    - update quantity of products to purchase in shopping cart
    - remove a product from shopping cart
    - checkout shopping cart and make payment through Stripe

2. **Functional Requirements (for shop owner):**
    - login and register a new shop owner
    - Create product
    - update product details and information
    - delete a product (that does not exist in a user's shopping cart or is being purchased)
    - view listing of all products in the store
    - search products
    - view all orders made by customers, and their order details
    - update order status
    - search orders
    
3. **Non-Functional Requirements (for customers):**
    - Mobile responsiveness
    
### 3. Structure
1. Nav Bar: Allows user to navigate to products listing, profile page / login page / account registration page, and shopping cart.
2. Home Page: Has a CTA button to direct user to product listings
3. Shopping Cart: displays summary of selected products that the user has chosen to purchase.
4. User Login/Register/Profile: Upon clicking on the 'user' icon, user will first be directed to the login page to log in. If user do not have an account, user can register for a new account via the login page. If the user has already logged into the site, user will be directed to their orders page.

### 4. Skeleton
<br/>
1. Home Page
2. Product Listings
3. Product Page
4. Shopping Cart
5. User Login

### 5. Visual Design
Use of standard fonts to aid readability to provide a clean UI.

## 3. Features
**For customers:**
1. Customers can add products to cart, and checkout their cart upon login / registration.
2. Customers can view their order history, including their order status.
2. Search filters allows users to search for products based on it's specifications, improving customer experience when browsing for products with the intent of making a purchase.
3. Shopping cart page shows product image, product details and selected quantity - providing customers a clear summary of their selected items to be purcahsed.
4. Customers are also able to navigate from each of their shopping cart item back to it's product page to review the product description again before confirming purchase.
5. Inline updating of shopping cart item quantity. The subtotal and order summary will also be updated instantaneously to reflect any changes in the total amount.


**For shop owners / administrators:**
1. Owners can view their profile upon login, and register a new shop owner or administrator
2. Owners / administrators can view all products and search for products
3. Owners / administrators can create and update a product.
4. Owners / administrators can upload product images for each product.
5. Owners / administrators can delete a product (that does not exist in customer's shopping cart or is not being purchased)
5. Owners / administrators can view all customers orders and their order details.
6. Owners / administrators can update order statuses.
7. Owners / administrators can search for orders.

**Limitations and future implementations (for customer site)**
1. Allow customers to edit/update their profile details (i.e. contact information and address), as currently customers can only view their profile created upon registration.
2. Allow customers to reset their password or registered email.
3. Enable sorting of products / product search by alphabetical order, lowest to highest price etc.


**Limitations and future implementations (for owner / admin site)**
1. Allow owners / administrators to also view user accounts and create, edit and delete a user.
2. Allow owners / administrators to delete orders.

## 4. Technologies Used / Credits
- Built using HTML / CSS / Express / ReactJS
- Database created with MySQL & PostgreSQL
- Knex.js (http://knexjs.org/) & Bookshelf.js (https://bookshelfjs.org/) for building of MySQL query
- Caolan forms (https://github.com/caolan/forms) for creation of forms in admin site
- db-migrate (https://db-migrate.readthedocs.io/en/latest/) for MySQL database migration
- Stripe (https://stripe.com/) for online payment
- Cloudinary (https://cloudinary.com/) for image uploading
- Axios for calling of API
- UI created using Bootstrap (http://getbootstrap.com/) & React Bootstrap (https://react-bootstrap.github.io/)
- All icons are from Flaticon (https://www.flaticon.com/)

**Data Sources**
- All product images, informationa and content from Razer, Logitech, Steelseries, Glorious, Roccat, Corsair, HyperX.
- Landing page video from Razer.

**Deployment**
- Heroku to deploy express application
- Netlify to deploy React application
