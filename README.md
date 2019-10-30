# swpp2019-team20

[![Build Status](https://travis-ci.com/swsnu/swpp2019-team20.svg?branch=master)](https://travis-ci.com/swsnu/swpp2019-team20)

![logo](./frontend/src/logo.png)

## Sprint1: USER STORY

----

```
# version
1. 2019.10.05: ver 1.0 - project requirements and spec
```

# Members
- Koo Yunmo
- Lee Mineun
- Han Jinje
- Seong Yongun

----

# Customer

In a group of two or more people who engage in economic activities, everyone can be an appropriate customer of this service. This service is useful in all the various group activities where payments occur, such as borrowing money from close friends, dutch after meals with colleagues in a restaurant, company meetings, and club trips. Since these transactions frequently occur, there are many inconveniences in managing money, such as complicated relationships between borrowing and paying back. The money problem among people is quite stressful because people often forget about debt or find it difficult to calculate when multiple payers exist for multiple times. While calculating and urging people to pay you off, you may waste time and emotions.

Since these problems destroy mutual relationships by making people lose trust with each other, customers have a desire for services that solve these problems on their behalf. We offer a convenient solution to customers who are tired of these debt problems. More specifically, (1) fast and automatic calculations through an intuitive UI and simple upload of receipt, (2) appropriately frequent notifications so that no one loses money or trust, and (3) blame or praise the debtor (4) prediction the date when all debts will be repaid. If you need one or more of these functions, you are the right customer of this service.

----

# Competitive Landscape

The current mobile application <Dutch: Dutch Pay Calculator>’s purpose is to make people's Dutch pay process easier. However, this application only has the functionality of a simple calculator. In order to use this calculator, a user has to input the price at first hand. Also, because they do not store user data, each time a new transaction is registered, meaningless arbitrary names have to be given to derive the result. It is also the creditor's task to tell the borrowers how much to pay back. In order to notify the payment information and debt facts to borrowers, although this is not a formal service, people use KakaoTalk group chat a lot. After the lender invites borrowers in group chat, the lender tells how much each person should repay. Invited people send money and leave the group chat. This approach allows people to know who hasn't sent money yet and to give some force. However, people forget the fact that there was such a chat over time, and some people do not leave the chat even after paying back the money, so there is a lack of force.

Our service is different from the existing service mentioned above in the following strengths. First, by easy searching and clicking the participants and uploading a receipt photo, our ML feature automatically calculates who should send how much money to whom and analyzes what kinds of consumption is. For example, the calculation of the _Many to Many for K_ times transaction relationship can be conveniently calculated, and the paying off process can be easily performed due to maintaining a database for users. Second, because there exists a mutual credit evaluation system, every user can see the credit scores and comments of others through the profile page, so that borrowers are forced to repay before the deadline. Third, there are appropriately frequent notifications proportional to the user's credit and deadline. This frequency is also automatically calculated. Last, users can easily keep track of the whole list of what they ought to pay and what they need to get. Users also can catch their consumption patterns, make sure the process of paying back is well, predict the probability of repaying a loan. By using user information, this service shows how capable a borrower is of repaying a debt. In addition, there is a review filtering function through sentiment analysis. Users can use the filtering function to see only positive or negative reviews.

----

# User Story

## Registering & User Information

### 1. Registering the Service

- **As** a non-member of the service
- **I want to** register to the service
- **So that** I can use this service
- **Acceptance Test**
   - The URL of our service leads the user to the index page(before login).
   - When a user with no membership clicks on [Join Us] button, the register page appears. Otherwise, the user can click [Login]
button, move to a login page and click [Register] button there.
   - Users must fill out mandatory items to make a membership.
   - After filling out, there are two buttons that create an account. The difference is that [Submit] button will take the user to the login page, but [Login] will automatically log in and take the user to the index page(after login).


### 2. Writing/Changing Additional Personal Information

- **As** a member of the service
- **I want to** write additional personal information
- **So that** I can receive additional service
- **Acceptance Test**
   - A button that is written [(username)] is at the top right of index page(after login). When a user clicks it, the user can move into own profile page.
   - At the left top of the page, the user can upload or change the profile image.
   - Just below the profile image is a button that is written [Account Settings]. When the user clicks that button, an entry used to record additional personal information appears. If clicked again, the entry disappears.


## Loans

### 1. Registering A Loan

- **As** lender
- **I want to** enroll an official 'loan'
- **So that** I can get payback before a specific deadline date.
- **Acceptance Test**
  - The user(lender) has to fill out the required fields(IDs of users involved in this loan / checkbox(specifying lender or borrower) / amount of money / deadline)
  - When the user clicks on the "Register" button
  - Then the user should see the registered loan in the side navigation bar.

### 2. Sending Notification

- **As** lender
- **I want** this service **to** automatically notify other borrowers that they should pay me back before the deadline instead of me.
- **So that** the borrowers don't forget to pay me back.
- **Acceptance Test**
  - When a loan is registered, the server should calculate the amount of money that each user should pay back, the frequency of the notification, and starts the deadline countdown.
  - The borrowers should receive notification(email, Kakao-talk message, MMS) at the correct time.


### 3. Viewing Ongoing Loans

- **As** a participant of an ongoing loan
- **I want to** see the information of the loan
- **So that** know what I should do
- **Acceptance Test(member)**
  - On the left side of index page(after login), there are ongoing loans that the user participates in.
  - Loans that the user has done processing goes to the bottom. Between loans that haven't been processed, ones that have less time remaining go to the top.
  - If the user clicks the loan item, information about it appears on the right side of the screen.
- **Acceptance Test(non-member)**
   - When a member includes non-member to a loan, URL links are made and sent to non-members.
   - When a non-member clicks the URL, a page similar to index page(after login) is opened and can view loans.
   - However, a non-member can't create loans and rate credits.


### 4. Viewing Completed Loans

- **As** a participant of a completed loan
- **I want to** see the information of the loan
- **So that** I can confirm that a loan is completed & view historical loans.
- **Acceptance Test**
   - In the profile page, there is a part that is written "Recent Loan". Completed loans that I participated in are listed, recent ones at the top.
   - Users can select a period of time and view.


## Credits

### 1. Rating a Credit

- **As** a user
- **I want to** rate credits of other people
- **So that** I can incentivize users to pay me quickly.
- **Acceptance Test**
   - When the lender enters the loan info screen,
   - The lender should see the list of users participating in the loan.
   - The lender should see a rating field next to each unrated user.
   - After filling out the rate field and submitting, the lender should see that the user has been rated.

### 2. Checking my Credit

- **As** a user
- **I want to** see my credit
- **So that** I can verify that my actions are appreciated by other users.
- **Acceptance Test**
   - At the top of my profile page, my overall credit rating is written as a number out of 10.
   - There is a part that is written "Reviews". A user can see how other people rated and what they wrote about the loan with that user.


### 3. Checking Other people's Credit

- **As** lender
- **I want** check the credibility of other users that I borrow money and the expected day of payback completion.
- **So that** I can check whether I can get my money safely.
- **Acceptance Test**
   - When the lender clicks on the other users' profile button, go to the user profile page.
   - The profile page should show the credit rating score and the previous reviews written by other users.


----

# User Interface Requirements

![req](https://user-images.githubusercontent.com/17061663/66247985-63453c00-e75c-11e9-9443-20e6f8b0b78a.jpeg)
