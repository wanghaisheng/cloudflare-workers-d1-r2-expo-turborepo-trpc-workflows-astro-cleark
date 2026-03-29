# Product Sense
This is the meat of any product Data Science interviews - acing it, and you have a good chance at an offer. Questions usally come in the form of "Measure of success", “Favorite Product/Feature” and “How do you make it better”, and “New feature to build” (which usually involves tradeoff discussions among a few potential ideas and options).

Below are some notes and tips collected from various books, most notably "Cracking the PM interview". 

## Product Intuition
### **Type 1: Designing a Product**

*Step 1: Ask questions to understand the problem*

*Step 2: Provide a structure:* 

- Interviewers are looking for structured thinking. The easiest way to show this is to give a structured answer and call out which part of the structure you’re on. For example, you might say something like, “First I’m going to talk about the goals. Then, I’m going to list out some potential features. Finally, I’m going to evaluate each of those features against the goals. Okay, so starting with the goals...”.

*Step 3: Identify the users and customers*

- Now that you understand the question itself, you should identify who the users and customers are. Ask more questions if you need to. In some cases, the users and customers aren’t the same person. The customer is the person paying for the product; the user is the one using it. There also may be multiple users.

*Step 4: What are the use cases? Why are they using this product? What are their goals?*

- For each user (if there’s more than one), make a list of the use cases. This is a list of the different tasks or scenarios that a user might want to use the product for. (Jobs to be done)
- You’ll need to assess, either by yourself or by discussing the situation with your interviewer, which use cases to design for. You might decide that all of them are very important, or you might decide that some use cases are less important than others.
- You can also think about these goals at a higher level. You can think about not only *what* you do with a product, but *why you do it*. What is the underlying motivation? For example, the underlying motivation for the keychain might be independence.

*Step 5: How well is the current product doing for their use cases? Are there obvious weak spots?*

- In many cases, and especially when you get a question in the form of “Design a _______ for the _______,” it can be useful to think carefully about what makes this type of user special.

*Step 6: What features or changes would improve those weak spots?*

*Step 7: Wrap things up*

### **Type 2: Improving a Product**

These questions can be asked in general terms (“Pick a product. How would you improve it?”) or by targeting a specific product (“How would you improve Product X?”). Either way, the secret to these questions is identifying and understanding the product’s biggest issues.

**Step 1: What is the goal of the product?**

First, you need to understand the product’s ultimate goal. What problems is it solving for the user?

**Step 2: What problems does the product face?**

Next, you need to assess the problems the product faces.

- Does it need to expand its user base? If so, should it broaden its user base by entering a new
market, or should it expand in its existing market?
- Does it need to increase revenue? If so, is this about increasing revenue per user or about
increasing the number of paying users?
- Does it need to increase user engagement?
- Does it need to increase conversions from visitors to registered users?

To assess this, think about how the product is currently designed. What does the product appear to prioritize?

**Step 3: How would you solve this problem?**

be open about the tradeoffs of each option.

**Step 4: How would you implement these solutions?**

If it’s not immediately obvious, discuss with your interviewer how you would implement the solution you proposed. What are the bigger technical or business challenges? How could you reduce the costs or risks associated with the solution? For example, you might test out your solution on a small user base or roll out a limited prototype.

**Step 5: How would you validate your solution?**

what metrics you would gather to see if your solution really worked.

### **Type 3: Favorite Product**

These problems are similar to “improve a product,” but approached in reverse. Rather than speaking about what’s broken about a product, you discuss why you love this product.

Some of your favorite products might not be good candidates for this question; beware of discussing them if you just can’t think of much that’s interesting to say about them. Similarly, you shouldn’t pick a product solely because it’s an interesting one to discuss. You want something that you, personally, connect with. You want your passion for this product to come out. Don’t pick something because it’s the “right” product if it’s not the right one for you.

**Step 1: What problems does the product solve for the user?**

You, or at least someone close to you, are probably the user here. You need to think about not just what the product is, but also what the user’s goals are.

**Step 2: How does the product accomplish these goals? What makes it “neat”?
What makes users fall in love with the product?**

For example, it might have a wealth of user data that allows it to perform more powerful analytics. Or maybe it just has an excellent interface, where every button seems to be in just the right place.
In addition to being great at accomplishing these goals, there might be other things about the business that you think are particularly impressive. They might have a clever revenue model that’s a win-win for users, or they might have a way of reducing their costs substantially by relying on crowdsourcing. It’s okay to talk about these details as well.
For many products, there is also an emotional connection to the product. Some products are truly loved by consumers; they are the things people rave about. Why?

**Step 3: How does it compare to the alternatives?**

Every product has its alternatives, even ones that are seemingly first to market. Think both narrowly and broadly about what the “competition” is for this product. The direct competition might be other websites that do the exact same thing, and the indirect competition might be physical products that achieve your goal.

**Step 4: How would you improve it?**

You don’t necessarily have to go into this immediately, but it’s a natural follow-up question the interviewer might ask.

## **Product Metrics**
Time to whip out your funnel and rattle off these metrics as you see fit. 

**Users / Traffic:** How many users does the product have? How are they acquiring users? Which channels are the most effective in getting users? How (and why) has the user base grown overtime? How many active users are there? How do we define what an active user is?

**Conversion:** How effectively does the product convert a visitor to a user, a free user to a paid
user, or a paid user to a more highly paying user?

**Referral Rates:** Do users refer other users? How often? Is the product viral? Where are users coming from? Are they referring their friends?

**Engagement:** Are users actively engaging with the product (posting, comment, playing, etc.)?
How often? How many users are using feature X? What percent have completed a particular workflow? What are people saying about the product? Do they love it? Can you measure that?

**Retention:** How often do users come back? How many users come back after a certain amount
of time? For some products, visiting once a month is good. For others, you’ll want a user to
frequently visit. What is the churn rate? What is the conversion rate (free to paid, visiting to signing up, etc.)?

**Revenue:** How does the product make money? How much money does it make? How much money does each user bring in (average revenue per user)? What is the lifetime value of a customer? What is our revenue growth rate?

**Costs:** Where does the product face costs? Does it require physical materials? What are its
development costs? Does it face high support or sales costs? What is the customer acquisition cost? How much does supporting a customer cost?

## **Misc. Tips and Tricks**

Ultimately, these design questions are getting at how well you can show user **empathy**. Can you get inside the user’s head and think about what that type of user would want? Or will you just design the product you will want? Focusing on the user is key.

In addition though, the following tips and tricks will help you:

**Have an Opinion:** Develop a point of view and act like you’re the owner of the product.
Interviewers want PMs who have opinions.

**“Wow” the Interviewer:** Try to come up with at least one “wow” idea. When you find it, point
it out. Did you think of a major market the product could enter easily? Did you come up with a
killer feature that would make people use the product twice as much? Don’t let it get hidden
among the quick fixes.

**Use the whiteboard:** Don’t feel you need to stay glued to your seat during such a question. In
fact, it’s great to get up and use the whiteboard; that’s what it’s there for. Using the whiteboard
may help you communicate your design more clearly to your interviewer.**Don’t overbuild:** Some people go overboard with wacky designs to solve a simple problem.
You’ll want to be realistic about what can and can’t be built, and what the tradeoffs are.

**Don’t complain that you need more research:** Yes, yes, we understand that, in an ideal world,
you’d love to study a variety of things and gather a bunch of data. You can’t do that in the
interview though—or in the real world. You’ll have to make do with what you can. It’s fine to
briefly discuss what research you would like to gather to better inform your decision. If your
interviewer seems interested in this discussion, then go for it. Otherwise, don’t dwell on it. Use
your best judgement to inform your decision, just as you would in the real world.

**Think about the business, too:** The customer’s goals are incredibly important, but so are the
goals of the business. If you’re critiquing a real product, think about the business goals. For
example, if you’re discussing what you would improve about a social media product, consider
what the business’ primary concerns are. Is it increasing revenue? User sign ups? User
engagement? These goals may guide how you want to improve the product.

**Be open about the tradeoffs:** Some candidates try to pass off their product as *the* best idea, as
though their interviewer won’t catch potential issues. Not so. Your interviewer will know the
issues your idea has. If she doesn’t, then you’ll actually impress her by pointing out issues that
she wasn’t aware of.

## Case Questions
Pretty similar to consulting interviews; interviewers are looking for candidates who will do the following:
- **Structure a problem:** Even seemingly open-ended questions can, and should be, broken down into components. Your market can be segmented and your strategy can be divided. Find a way to tackle a problem in a structured way.
- **Show strong instincts:** We rarely have all the data we’d like, and we don’t know what the
future will hold. A good PM should be able to make good business decisions, even in the
absence of exhaustive data.
- **Drive, Not Ride:** You might not be the CEO of the product, but you are a leader. Show this by
driving the interview forward. Be relatively exhaustive in your response to a question – **discuss the benefits and tradeoffs**, **the short-term and long-term benefits**, etc. – and back up your answers with reasons. Don’t go overboard, though. If you find your interviewer is asking many follow-up questions and you’re only giving short responses each time, you might be riding and not driving. On the other hand, if you’re concerned you’re going into too much detail, ask your interviewer if he’d like you to expand.

## Metric Sense
Another big part of Product DS interview. Usually you will need to answer questions like:
- **Diagnose metric movement**: why did my X metric drop Y% this week?
- **How would you measure the success of XYZ?** e.g. Facebook Stories; Google Drive; Airbnb Categories (designing A/B tests; quasi-experimental techniques)
- **Should we launch ABC feature?** (define product success metrics, understand tradeoffs and ecosystem impact)

### Diagnosing Metrics Change

**Step 1: Scope out the metric change**

Clarify and gather context - metric definition, timeframe, importance, magnitude, etc. 

**Step 2: Hypothesizing contributing factors**

- Accidental changes: “drop not real” - bugs in logging
- Natural changes: seasonality, day of the week/holiday, weather, etc.
- Internal changes: new feature launches, bug fixes, internal product changes, marketing campaigns, etc.
- External changes: competitors launching new products, macro events like pandemic or a recession

One good way is to walk up the product funnel. 

**Step 3: Validate each factor**

Slice and dice. by region, age, gender, language, app version, device, platform, plot YoY or MoM, check correlated or health metrics (for logging issue), etc. 

**Step 4: Classify each factor** - bucket each factor into categories

- Root cause: the main reason
- Contributing factor: while not the root cause, still contributing to the root cause
- Correlated results: factors that are symptoms of the root cause but not a contributing factor
- unrelated factors

### Product Metrics Definition

e.g. “how would you measure the success of Facebook dating”? 

**Step 1: Clarity the product & Its Purpose and users**

We need to start by defining the problem. This can be done by clarifying the business purpose behind the product, the product’s goal, who this feature is for, and what the user flow looks like, etc. 

**Step 2: Explain the product and business goal**

tie it back to company mission

“to build for the future with a solution that’s **flexible, helpful, and inspires innovation**.”

“to enable a hybrid work experience that enhances collaboration, strengthens human connection, and increases wellbeing for people—wherever they are and however they work.”

**Step 3: Define success metrics**

It is crucial to determine and measure the main actions a user needs to take in order to drive the product and business goal. [Acquisition - Activation - Engagement - Retention - Revenue]


### Assessing Metric Trade-offs

1. Understand what the metrics in question actually mean
2. Understand business and product goals
3. Tie back to long-term gains and user experience goals
