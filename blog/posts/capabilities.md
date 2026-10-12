I attended an economics class in Berkeley during my freshman year in San Francisco. A friend studying there invited me to go visit. He had to do something through the afternoon and left me in one of the halls. At the time I thought I wanted to do economics, so I was glad to find out one of the lectures in that hall was Berkeley's microeconomics course, ECON 100A, and decided to attend it during the Spring.

Ironically, the more I studied economics, the more skeptical I felt about it as a social science. I found it too constrained by theory and unreasonable assumptions. 

It was nevertheless a fun subject to study. I have hundreds of pages from notes I would take on an oversized drawing tablet plugged into my computer that must've looked the silliest set-up of anyone in the hall. 

My favorite concept I learned in that class is dead-weight loss, or DWL for brevity. Feel free to skip this section if you're already familiarized ([click here](#after-dwl)). 

Imagine you have a seller - say, a business - and many buyers that want to buy a good from that seller. We assume the seller wants to earn the most amount of money possible and buyers want to acquire as many units of the good as possible. 

How does that good get priced? Some buyers might be willing to pay more for it than others, so the seller sets prices high. This seems reasonable, but if 8 buyers were able to pay $12 each while 2 were able to pay $40, setting the price of the good to $40 is a *net* loss at $80, as pricing it at $12 would net $96, leaving a $16+ difference on the table. Not to mention the social effects making the good available to more people might have[^1]. 

Let's formalize this: 
- In this example, the seller can price the good at any price in the range 1-100. This is called the *supply curve*.
- Some number of buyers can afford the good at a given price within the range. This is called the *demand curve*. For our example, we'll consider 10 buyers total, each able to afford it at a different price.

We can plot each of these curves against each other. This will be helpful for finding what is the optimal price a seller should sell their product at. 

![Supply and demand curves plotted as price against quantity.](/blog/assets/figures/en/supply-demand-curves.png "Supply and Demand Curves")

We see all 10 people can afford a unit of the good when the price is zero. Yet the seller can't offer it for less than $10 (this may be their break-even price). Perhaps they can offer the good at $80 for the two people who can afford it. What should they do?

The optimal price to quantity ratio lies in the intersection of the two curves. Intuitively, it's the maximum number of units the seller can sell at the highest price. Five units at $50 each nets $250. Much higher than the $160 from selling two units at $80, and higher than selling a lot of units at $20, also totalling $160. We can visualize this. 

![Supply and demand curves with the equilibrium and two alternative price points marked.](/blog/assets/figures/en/supply-demand-equilibrium.png "Equilibrium and Alternative Price Points")

This is the scenario with *the most given for the most paid*, and is called a state of equilibrium. We can now talk about dead-weight loss (DWL). 

Conceptually, DWL is the profit the seller could've made had they priced their product closer to equilibrium when the product is too expensive or cheap. 

We visualize it as the area occupied between the corners of 1) the equilibrium point, 2) the point at the demand curve the good was priced at, and 3) the point on the supply curve at the same quantity. 2 and 3 are parallel to each other, making DWL look like a triangle. Let's visualize it for when the good is sold at $80. 

![Deadweight loss triangle between the supply and demand curves when the good is sold at $80.](/blog/assets/figures/en/supply-demand-dwl.png "Deadweight Loss at a Price of $80")

The area in the triangle - the gap between the demand curve and the supply curve - represents goods the seller could've sold had they priced their product closer to equilibrium, letting them net a higher profit. 

DWL on the other side of the graph is profit the seller is losing due to pricing the good at too low of a price. It's sometimes referred to as philanthropy - ok, no, but you get the idea. It's when consumers are benefiting at the cost of money the business could've kept for itself.

![Deadweight loss triangle between the supply and demand curves when the good is sold at $20.](/blog/assets/figures/en/supply-demand-dwl-low-price.png "Deadweight Loss at a Price of $20")

Congrats! You now know some undergraduate microeconomics. You can now ask: "Why doesn't Apple price their old stock lower given it's worth less and some people might still buy it? Doesn't that minimize DWL?" and realize the real world isn't as simple and interpretable as this model[^2].

<a id="after-dwl"></a>

Ok, so why am I writing about DWL? I see some parallels between ideas in DWL Minimization and the current paradigms of coding agents. 

I work extensively with coding agents. Almost every day I'm prompting, reviewing code, etc[^3]. 

I've observed that there is an inverse relationship between the skill needed [by a human] to accomplish a task and how good a model is. 

Example: if you're working with a frontier model, it's generally sufficient to ask for what you want. "Fix this bug", "Add X feature", etc. If you're working with small models (with 30B parameters or lower), they need considerably more hand holding. Prompts need to be longer and specific because otherwise the models get lost in thought and churn their context windows before doing anything useful.

In other words: when a model is bad/limited at a task, humans supplement its deficiency with their own skills and steering. This is true for any task that frontier models aren't already good at or when using handicapped models. It's part of why Open Weight models aren't as big of a threat as they may seem in cybersecurity. You still need knowledgeable humans (and a ton of compute) to get the most out of them, at least for now.  

We can map these concepts onto the first graph if we swap the Demand curve with Human steering and the Supply curve with Model effort. The x-axis represents how much of a task a model completes autonomously: at the very left, the human does everything. At the very right, the model can do it end-to-end. The y-axis represents how much effort each side puts in. The height of the human line is the human's effort, just as the height of the model line is the model's effort. Both axes are within the 0-100% range, with the x-axis representing performance and the y-axis the share of each party.  

Let's reintroduce the first graph with these changes.

![Human steering and model effort plotted as a share of effort against how much of a task the model completes autonomously.](/blog/assets/figures/en/human-model-curves.png "Human Steering and Model Effort")

You might think we always want to be on the rightmost side of it. I think that constitutes dead-weight loss for both economic and practical reasons. 

One simple example is using frontier models for trivial changes that a smaller model could've made. E.g., changing the copy in a page or running trivial git commands (when was the last time you prompted 'yes, push it'?). 

![Deadweight loss on the right side of the human steering and model effort graph, where a frontier model is used for a trivial task.](/blog/assets/figures/en/human-model-overreliance.png "Deadweight Loss From Over-Relying on the Model")

The economic argument is obvious: you're using frontier tokens for trivial tasks. Ideally, you'd want to save the cost.

The practical argument is that if token spend wasn't a concern, it would probably be faster if you used a smaller/faster model. Like if Cursor's Composer did it rather than have Astra think for a minute straight. 

And even if your very smart model was ultra fast, that is expensive right now, so the economical argument still holds: others *could* do the same thing just as fast for cheaper, if we had the systems to transfer context efficiently (sort of pass the ball but for models).

I see this mattering in the short to medium term but not the long term. 

When token subsidies stop, a system to auto-route prompts and tasks will become valuable to save unnecessary spending and time. Both for employees using AI and systems within the company that are heavily token-subsidized[^4]. 

Long-term, I expect frontier intelligence to become too cheap to meter and very fast. If the labs mantain token subsidies until that happens, it'll be less of an issue. 

If frontier intelligence does increase in cost, I see three technical challenges need to be cleared for a "DWL-optimized harness" that chooses the right intelligence and speed for a task: 
- Transferring context efficiently: how to transfer context between models cheaply and quickly, ideally at as close to zero cost and latency. This is most important for individual tasks.
- Parallelism: if many models are doing many tasks, how can inference providers maximize GPU utilization and KV Cache offloading and onloading so that every watt of compute is being routed to something at a given time. 
- Model Profiling: you don't need to route requests each time if you already know what models sit at equilibria. To my knowledge, there isn't an all-purpose toolbench to do this yet. 

I expect that while intelligence is subsidized, companies and individuals will use frontier models because it feels like the safe choice and it requires less steering. Budget-concious organizations will make their own evals and perhaps even RL small models on them (like [Ramp](https://x.com/RampLabs/status/2052447438795833506) did). 

But to diffuse AI into the wider economy at its current price, much work needs to be done on simple to use optimizers that small and medium sized organizations can use to save their token spend, both for use by individuals within a organization and for specific tasks. 

Paraphrased: Jev might be very cheap but your average store clerk or non-profit worker isn't gonna get an API key and make an eval to see if it beats Astra at their classification task. Hence the need for diffusion companies.  

In the graph, the equilibria makes sense if you think about the 50% human effort as setting up the infrastructure and evals to get the model with the best speed, price, and intelligence for the task (both pre-selecting it or changing it at runtime). Whereas using a frontier model avoids you the work but costs a lot.

![Equilibrium between human steering and model effort, at 50% of the task completed autonomously by the model.](/blog/assets/figures/en/human-model-equilibrium.png "Equilibrium Between Human Steering and Model Effort")

I expect this to change with harnesses that auto-route and simpler infrastructure for evaluating and training task-specific models. It is also nice that this is a defined engineering effort. If we get it right once, everyone benefits.

What about DWL on the left side of the graph?

I was recently experimenting with the Qwen family of models, running them locally on my computer with Ollama. It was disappointing. They know a lot and can pull off impressive tricks for a small model, but as soon as you throw a real task at them, they blow their context budgets overthinking unnecessary details.

![Deadweight loss on the left side of the human steering and model effort graph, where a small model needs heavy human guidance.](/blog/assets/figures/en/human-model-underreliance.png "Deadweight Loss From Under-Relying on the Model")

I could only get them to do what I wanted by pointing out the exact lines of code they had to look at. I even had to change some code by hand because even though I'd tell them five times in a row to execute the change, it just thought, and thought, until its context overflowed. 

Another dimension the graph doesn't capture is time[^5]. It took me considerably longer to finish my project with Qwen because it needed so much handholding. I knew frontier models would've been done in way less time. It also doesn't capture mental load: it is so much easier to just prompt your way through. You don't really need to think. 

Though, in my case, I chose to work my way through it because I wanted to experiment. In the real world, DWL on the left is visible on tasks that the models aren't good at *yet*. The odd finance benchmarks, ML research benchmarks, and computer use tasks. You still need people reviewing and steering the model's outputs. 

In my opinion, if accuracy can be quantified and the task is economically valuable, they will be conquered eventually, likeliest first at the frontier, shifting to the right. This is true of tasks where labs and startups have an interest to introduce automation. It's part of the diffusion process. 

Together, both parts of the graph paint a cohesive picture: the frontier will lay the groundwork at the toughest challenges in a expensive, innefficient way, while diffusion makes them economically viable and fast.

I see two paths going forward for the future of work:
- Skills that can not be optimized against (yet) will become increasingly valuable. E.g., interpersonal communication, relationship building.
- If we do optimize everything optimizable (though I expect this to take really long), we'll make different problems for ourselves that 
require skills outside the scope of optimization (see [this](https://asteriskmag.com/issues/15/after-work-we-ll-have-each-other) essay).

In either case, we'll be better off from it. It will provide healthcare and education for millions of people in underprivileged areas, enable massive social mobility - the works. If we align it, that is.

[^1]: Ideally, each customer would be charged the maximum they can pay. This is referred to as first degree pricing. But often sellers don't know what that maximum price is, and instead offer many options at different tiers (ex. 1st class, premium economy, economy) so the buyer chooses for themselves. This is referred to as second degree pricing. Third degree pricing forces customers to segment by making the quality gap between the options large or enforcing tiers (ex. student discounts). They all aim to extract as much of what the customer can pay for a good from them, which is referred to as their surplus.

[^2]: Though, it follows very similar rules. If you study economics further, I encourage you to learn about the concept of the "invisible hand". TLDR: markets minimize DWL on their own because inefficient arrangements will get outcompeted or outpriced by an incumbent. But I won't spoil it for you. Go read! 

[^3]: 1 Billion tokens a day keeps the doctor away.  

[^4]: How many startups would be scrambling if the labs took away token subsidies today? Seriously. I was spending 6 figures in tokens at a previous startup (in API costs) every month. Had those been billed, it would've been like getting my salary paid twice! For a startup this might be OK, but at the scale of large companies or AI-native organizations, this'd be a huge financing issue. Ajeya Cotra talked about this [here](https://www.youtube.com/watch?v=Z19UEZHJzAg). In the future, some money will be directed towards buying API credits or GPUs instead of paying humans because intelligence will be cheaper and faster.

[^5]: As Naval [said](https://www.youtube.com/shorts/x-P119dx8xM): 'waste tokens to save time'.
