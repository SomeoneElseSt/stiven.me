I attended an economics class in Berkeley during my freshman year in San Francisco. A friend studying there invited me to go visit. He had to do something through the afternoon and left me in one of the halls. At the time I thought I wanted to do economics, so I was glad to find out one of the lectures in that hall was Berkeley's microeconomics course, ECON 100A, and decided to attend it during the Spring.

Ironically, the more I studied economics, the more skeptical I felt about it as a social science. I found its theories too constrained and based on unreasonable assumptions.

It was nevertheless a fun subject to study. I have hundreds of pages from notes I took on an oversized drawing tablet plugged into my computer that must've looked the silliest set-up of anyone in the hall. 

My favorite concept I learned in that class is dead-weight loss, or DWL for brevity. Feel free to skip this section if you're already familiarized ([click here](#after-dwl)). 

Imagine you have a seller - say, a business - and many buyers that want to buy a good from that seller. We assume the seller wants to earn the largest amount of money possible and there are many buyers that can each afford the product at a different price point. 

How does that good get priced? Some buyers might be willing to pay more for it than others, so the seller could set prices high. This seems reasonable, but if 8 buyers were able to pay $12 each while 2 were able to pay $40, setting the price of the good to $40 is a *net* loss at $80, as pricing it at $12 would net $96, leaving a $16+ difference on the table. Not to mention the social effects making the good available to more people might have[^1]. 

Let's formalize this: 
- The seller can price the good at any price in the range 1-100. This is called the *supply curve*.
- Some number of buyers can afford the good at a given price. This is called the *demand curve*. We'll consider 10 buyers total, each able to afford it at a different price.

We can plot each of these curves against each other. This will be helpful for finding the optimal price a seller should sell their product at. 

![Supply and demand curves plotted as price against quantity.](/blog/assets/figures/en/supply-demand-curves.png "Supply and Demand Curves")

All 10 people can afford a unit of the good when the price is zero. Yet the seller can't offer it for less than $10 (this may be their break-even price). Should they price high or low?

The optimal price lies in the intersection of the two curves. Intuitively, it's the maximum number of units the seller can sell at the highest price. Five units at $50 each nets $250. Much higher than the $160 from selling two units at $80, and higher than selling a lot of units at $20, also totalling $160. We can visualize this. 

![Supply and demand curves with the equilibrium and two alternative price points marked.](/blog/assets/figures/en/supply-demand-equilibrium.png "Equilibrium and Alternative Price Points")

This is the scenario with the *most given* for the *most paid*, and is called a state of equilibrium. We can now talk about dead-weight loss (DWL). 

DWL is the profit the seller could've made had they priced their product closer to equilibrium when the product is too expensive or cheap. 

We visualize it as the area between the corners of 1) the equilibrium point, 2) the point at the demand curve the good was priced at, and 3) the point on the supply curve at the same quantity. 2 and 3 are parallel to each other, making DWL look like a triangle. Let's visualize it for when the good is sold at $80. 

![Deadweight loss triangle between the supply and demand curves when the good is sold at $80.](/blog/assets/figures/en/supply-demand-dwl.png "Deadweight Loss at a Price of $80")

The area in the triangle represents goods the seller could've sold had they priced their product closer to equilibrium, letting them net a higher profit. 

DWL on the other side of the graph is profit the seller is missing out on due to pricing the good too low. It's sometimes referred to as philanthropy - ok, no, but you get the idea. It's when consumers are benefiting at the cost of money the business could be making if the good was priced higher.

![Deadweight loss triangle between the supply and demand curves when the good is sold at $20.](/blog/assets/figures/en/supply-demand-dwl-low-price.png "Deadweight Loss at a Price of $20")

Congrats! You now know some undergraduate microeconomics. Try asking: "Why doesn't Apple price their old stock lower given it's worth less and some people might still buy it? Doesn't that minimize DWL?" and realize the real world isn't as simple and interpretable as this model[^2].

<a id="after-dwl"></a>

Ok, so why am I writing about DWL? I see some parallels between ideas in DWL Minimization (the use of calculus to find, for varying supply and demand curves, points of equilibria) and the current paradigms of coding agents. 

I work extensively with coding agents. Almost every day I'm prompting, reviewing code, etc[^3]. 

I've observed an inverse relationship between the skill needed by a human to accomplish a task and how good a model is. 

For example, if you're working with a frontier model, it's generally sufficient to ask for what you want. "Fix this bug", "Add X feature", etc. Working with small models (in the 10-100B parameters range) requires more hand holding. Prompts need to be longer and specific because otherwise the models get lost in thought and churn their context windows before doing anything useful.

In other words: when a model is bad/limited at a task, humans supplement its deficiency with their own skills and steering. This is currently true for any task that frontier models aren't good at or when using handicapped models. It's part of why Open Weight models aren't as big of a threat as they may seem in cybersecurity and biology. You still need knowledgeable humans to get the most out of them, at least for now.  

We can map these concepts onto the first graph if we swap the Demand curve with Human steering and the Supply curve with Model cost. The x-axis represents how capable a model is relative to the task: at the left, the model is too weak for it. At the right, it's overkill. The y-axis represents what you pay. The height of the human line is how much steering the model needs from you, just as the height of the model line is what the model costs. The more capable the model, the less steering it needs and the more it costs.  

![Human steering and model cost plotted against how capable the model is relative to the task.](/blog/assets/figures/en/human-model-curves.png "Human Steering and Model Cost")

A simple example to illustrate DWL in this graph is when frontier models are used for trivial work that a smaller model could do. E.g., changing the copy in a page or running trivial git commands (when was the last time you prompted 'yes, push it'?). 

![Deadweight loss on the right side of the human steering and model cost graph, where a frontier model is used for a trivial task.](/blog/assets/figures/en/human-model-overreliance.png "Deadweight Loss From an Overpowered Model")

The economic argument against this is obvious: you're using frontier tokens for trivial tasks. Ideally, you'd want to save the cost.

The practical argument is that if token spend wasn't a concern, it would probably be faster if you used a smaller/faster model. Like if Cursor's Composer did it rather than have Astra think for a minute. 

And even if your very smart model was ultra fast, that is expensive right now, so the economical argument still holds: others *could* do the same thing just as fast for cheaper, if we had the systems to transfer context efficiently (sort of pass the ball but for models).

I see this mattering in the short to medium term but not the long term. 

When token subsidies stop, a system to auto-route prompts and tasks will become valuable to save unnecessary spending and time. Both for employees using AI and systems within the company that are heavily token-subsidized[^4]. 

Long-term, I expect frontier intelligence to become too cheap to meter and very fast. If the labs maintain token subsidies until that happens, it'll be less of an issue. 

If frontier intelligence does increase in cost, I see three technical challenges need to be cleared for a "DWL-optimized harness" that chooses the right intelligence and speed for a task: 
- Transferring context efficiently: how to transfer context between models cheaply and quickly, ideally at as close to zero cost and latency. This is most important for individual tasks.
- Parallelism: if many models are doing many tasks, how can inference providers maximize GPU utilization and KV Cache / model weights offloading and reloading so that every watt of compute is being routed to something at a given time. 
- Model Profiling: you don't need to route requests each time if you already know what models sit at equilibria. To my knowledge, there isn't an all-purpose toolbench to do this yet. 

I expect that while intelligence is subsidized, companies and individuals will use frontier models because it feels like the safe choice and it requires less steering. Budget-conscious organizations will make their own evals and perhaps even RL small models on them (like [Ramp](https://x.com/RampLabs/status/2052447438795833506) did). 

But to diffuse AI into the wider economy at its current price, much work needs to be done on simple to use optimizers that small and medium sized organizations can use to save their token spend, both for use by individuals within an organization and for specific tasks. 

Paraphrased: Jev might be very cheap but your average store clerk or non-profit worker isn't gonna get an API key and make an eval to see if it beats Astra at their classification task. Hence the need for diffusion companies.  

In the graph, the equilibria makes sense if you think about it as the model with the best speed, price, and intelligence for the task. Getting there takes human effort: setting up the infrastructure and evals to find that model (both pre-selecting it or changing it at runtime). Whereas using a frontier model avoids you the work but costs a lot.

![Equilibrium between human steering and model cost, where the model is just right for the task.](/blog/assets/figures/en/human-model-equilibrium.png "Equilibrium Between Human Steering and Model Cost")

I expect this to change with harnesses that auto-route and simpler infrastructure for evaluating and training task-specific models. It is also nice that this is a defined engineering effort. If we get it right once, everyone benefits.

What about DWL on the left side of the graph?

I was recently experimenting with the Qwen family of models, running them locally on my computer with Ollama. It was disappointing. They know a lot and can pull off impressive tricks for a small model, but as soon as you throw a real task at them, they blow their context budgets overthinking unnecessary details.

![Deadweight loss on the left side of the human steering and model cost graph, where a small model needs heavy human guidance.](/blog/assets/figures/en/human-model-underreliance.png "Deadweight Loss From an Underpowered Model")

I could only get them to do what I wanted by pointing out the exact lines of code they had to look at. I even had to change some code by hand because even though I'd tell them five times in a row to execute the change, it just thought, and thought, until its context overflowed. 

Another dimension the graph doesn't capture is time[^5]. It took me considerably longer to finish my project with Qwen because it needed so much handholding. I knew frontier models would've been done in way less time. It also doesn't capture the difference in mental load: it is so much easier to prompt your way through. You don't really need to think. 

Though, in my case, I chose to work my way through it because I wanted to experiment. In the real world, DWL on the left is visible on tasks that the models aren't good at *yet*. The odd finance benchmarks, ML research benchmarks, and computer use tasks. You still need people reviewing and steering the model's outputs. 

If accuracy can be quantified and the task is economically valuable, they will be conquered eventually, likeliest first at the frontier, shifting to the right. This is true of tasks where labs and startups have an interest to introduce automation. It's part of the diffusion process. 

Last, the analogy doesn't capture some qualitative aspects of models.

Like how I'd rather use Claude for anything conversational, or Codex for computer use. It doesn't capture how people begin to trust that a model will get it right 90% of the time and use it for specific work.

It discounts qualitative differences in the character of different model lines. This is partly reconciled if we think of the x-axis as a model family, e.g., Haiku being underpowered, Sonnet generally balanced, and Opus often overkill.

Together, both parts of the graph paint a cohesive story: the frontier will lay the groundwork at the toughest challenges in an expensive, inefficient way, while diffusion makes them economically viable and fast.

I see two paths going forward for the future of work:
- Skills that can not be optimized against (yet) will become increasingly valuable. E.g., interpersonal communication, relationship building.
- If we do optimize everything optimizable (though I expect this to take a long while), we'll make different problems for ourselves that 
require skills outside the scope of optimization (see [this](https://asteriskmag.com/issues/15/after-work-we-ll-have-each-other) essay).

In either case, we'll be better off from it. It will provide healthcare and education for millions of people in underprivileged areas, enable massive social mobility - the works. That is, if we align it. 

[^1]: Ideally, each customer would be charged the maximum they can pay. This is referred to as first degree pricing. But often sellers don't know what that maximum price is, and instead offer many options at different tiers (e.g. 1st class, premium economy, economy) so the buyer chooses for themselves. This is referred to as second degree pricing. Third degree pricing forces customers to segment by making the quality gap between the options large or enforcing tiers (e.g. student discounts). They all aim to extract as much of what the customer can pay for a good from them, which is referred to as their surplus.

[^2]: Though, it follows similar rules. If you study economics further, I encourage you to learn about the concept of the "invisible hand". TLDR: markets minimize DWL on their own because inefficient arrangements will get outcompeted or outpriced by an incumbent. But I won't spoil it for you. Go read! 

[^3]: 1 Billion tokens a day keeps the doctor away.  

[^4]: How many startups would be scrambling if the labs took away token subsidies today? Seriously. I was spending 6 figures in tokens at a previous startup (in API costs) every month. Had those been billed, it would've been like getting my salary paid twice! For a startup this might be OK, but at the scale of large companies or AI-native organizations, this'd be a huge financing issue. Ajeya Cotra talked about this [here](https://www.youtube.com/watch?v=Z19UEZHJzAg). In the future, some money will be directed towards buying API credits or GPUs instead of paying humans because intelligence will be cheaper and faster.

[^5]: As Naval [said](https://www.youtube.com/shorts/x-P119dx8xM): 'waste tokens to save time'.
