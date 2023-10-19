---
layout: post
title: Summary of introduction to Machine Learning in Production
comments: true
add_brython: /assets/js/brython.js
add_brython_stdlib: /assets/js/brython_stdlib.js
all_my_py_code: piechart/piechart.py
chart_html: piechart/piechart.html


---
in machine learning understanding the theory is vital but it's not the end of journey, it's only the start.
as a machine learning engineer you have to put your system in production which is a long unpaved road. in this blogpost we discuss the summary of the first course in the machine learning in production specilization offered by [deeplearning.ai](https://www.deeplearning.ai/)

machine learning is more than just a <b> proof of concept </b> code in your jupyter notebook. you have to eventually deploy for users to use. so to put things into prespective how much is the gap between the POC code and the production?
the gap actually is quite large. the POC code is just 5-10% of the whole code you have to write
let's take a peek of the other components that are in an ML infrastructure 

![image](https://user-images.githubusercontent.com/40968723/186566292-3c580812-247b-44dd-9617-2a4855dd89fb.png)
[D. Sculley et. al. NIPS 2015: Hidden Technical Debt in Machine Learning Systems]

just as software engineers have [SDLC](https://www.synopsys.com/glossary/what-is-sdlc.html#:~:text=The%20Software%20Development%20Life%20Cycle%20(SDLC)%20is%20a%20structured%20process,all%20customer%20expectations%20and%20demands.]) to help them with the production process we also have  Machine Learning development Lifecycle.
First you have to define the project you are working on, what does it solve and how does it solve it. then you have to collect the data, selct a model and evaluate it then finally you deploy it into production. but as of the iterative nature of machine learning projects you might have to go back to collect more data or selcting other model and fine tune it.

![image](https://user-images.githubusercontent.com/40968723/186568227-2e125949-5557-41d7-99cd-2217db6c12c2.png)

- [Deployment](#deployment)
    - [Concept drift and Data drift](Concept-drift-and-Data-drift)
   
    

## Deployment 
at this stage you are ready to deploy. and you did! congrats! but don't just celebrate yet. we are only half the way through. after deployment you still have to monitor and maintin it and with this come <b> key challanges </b>

we know that ml modeling is an iterative process, you have to collect the data,build the model , experiments it and perform error analysis and repeat again. deployment is also iterative. you deploy the model then monitor it, as more traffic comes you collect more data and perform error analysis and so on

![image](https://user-images.githubusercontent.com/40968723/188486953-5c1cdda4-dd6b-4dc4-a8c3-f9e68118e4e3.png)

## Deployment key challanges

## Concept drift and Data drift
Data constantly change over time. which can degrade the performance of our model's prediction which was trained on older data. some times the change is slowl like in a language's vocabulary and sometimes suddenly like the change of people's behaviour after covid pandemic.

then what is the difference between concept drift and data drift?

concept drift refers to the change in the relationships between input and output data. meaning how we map (x --> y)
a great example of this is the change of behaviour of people after the pandemic.people suddenly bought more frquantly online which caused many false positives in  anti fraud detection systems.
another example is the change of prices of houses after inflation; changing the mapping between the size of a house and its price.

data drift is when the data distribuition changes rather than the relationship of input to output. the perfromance degrades because the model receives data on which it hasn't trained enough.
> notice : there's a confusion about the terminology across different resources. you might find different definition of each drift type elsewhere.

## Software engineering issues
the specific application and its requirements define how will the system be deployed 
- does it have to be processed in real time or processed in a batch after all data is received?
- should it be on the cloud or on an edge device or a browser?
- how much Compute resources (CPU/GPU/memory) do we need?
- what is the acceptable latency and how many queries per second are we expecting?
- should you log all the user data to use it for performence measuring or retrainig your model?


there are different reasons to deploy a machine learning model.some of the common ones are 
- you are making a new product or capability that didn't exist before
- you want to automate a task that was previously done manually
- an older ML system already existed and you want to replace it with a better one
## visusal inspection use case

in a phone manufacrtion factory the phones are to be inspected for defects and an inspector does so manually.

when automation is first introduced to a proccess one deployment pattern is common to be used is <b> shadow mode </b>
in this mode the ml system shadows the human(works in parall with him) but the system's output is not used for any decisions in this phase. the purpose of this phase is to evaluate how good the learning algorithm is performing compared to a human.
![image](https://user-images.githubusercontent.com/40968723/188463754-f1dbde6f-665f-4be4-ab07-9c34cbffaacc.png)


when you think the learning algorithm is performing good enough now it's time to give it more responspility
in <b> Canary deployment </b> the system is given a small fraction of the traffic initally (say 5%) that can make dections on them .that way if the system makes any mistake it will affect only a small fraction of the phones.
then the system is monitored and the traffic is ramped up gradually as we are more confident that it's performing well.
![image](https://user-images.githubusercontent.com/40968723/188463810-762ada42-c84a-4b05-b19d-6f565f085f55.png)

in the case that an older ml system exists you might wanna consider the <b> Blue green deployment pattern </b> in this pattern the data is goes to a router that can route it to the old(blue) prediction server or the new(green) prediction server. this way you can easily rollback if anything goes wrong
![image](https://user-images.githubusercontent.com/40968723/188463986-8b1ca798-9f3d-4f2c-8432-96df1be87cd6.png)
## Degrees of automation
one thing to note is that automation is not a binary status either the process is automated or manual but it's rather degrees of automation. starting from human only(completly manual) to full automation where no human intervention is required 
![image](https://user-images.githubusercontent.com/40968723/188472858-8ba46196-3165-4219-8d52-d0dddc526e80.png)

## Monitoring
as you already know building the model and deploying it isn't the finish line you still have to monitor it to enusre that the performance is good enough 
but what should we monitor exactly? 
we need to track anything that is indictaive of change whether it's input distribuiton or output change or resources consumed.tracking these changes is extremly handful in maintaining the system performence

Detailed examples of these metrics

- Software metrics
    - Memory, compute, latency, throughput, server load
 > network throughput is the amount of data moved successfully from one place to another in a given time period, and typically measured in bits per second (bps), as in megabits per second (Mbps) or gigabits per second (Gbps).
 
- Input metrics
    - Avg input length
    - Avg input volume
    - Num missing values
    - Avg image brightness

- Output metrics
    - \# times return " " (null) (the model thinks that the user didn't say anything)
    - \# times user redoes search (indictive that the initial search wasn't good enough)
    - \# times user switches to typing (like the case of a user who got frustrated from the wrong speech recognition)
    -  CTR 
> (Clickthrough rate is ratio showing how often people who see your ad or free product listing end up clicking it. Clickthrough rate (CTR) can be used to gauge how well your keywords and ads, and free listings, are performing.

![image](https://user-images.githubusercontent.com/40968723/188485448-9c1e5f30-a52b-4092-ae02-d28840a05e98.png)
[the red lines are thresholds for alarms]

## modeling 
![image](https://user-images.githubusercontent.com/40968723/190164542-fe830024-83dd-4f33-a77f-690617e41d86.png)
There are milestones in model development

first you have to do well on <b> training set</b> (usually measured by average training error) then you have to do well on <b>dev/test sets.</b> but as always just when we think the road ends here, it doesn't.
you also have to make sure it does well on business metrics/project goals.

so how can a model's test set not the ultimate metric?
the keyword here is not just numbers matter, thing matter too, especially important things

## Performance on disproportionately important examples

Example: Rare classes5
a great example of a model that <b>looks good but is actually bad is </b> if you have a Skewed data distribution of a rare disease in which 99% of the data is negative and 1% is positive
you can acheive 99% acurracy by just outputting print("0").that's not a really good model if you ask me
> of course you can use other metrics that will reflect the performance better for imbalanced data, but that's not the point

Example: ML for loan approval

models are only as good as the data it's fed if the data is dicrimantive in anyway the model will also be dicrimintive
so make sure not to discriminate by ethnicity, gender, location, language or other protected attributes.

Example: Product recommendations from retailers

Be careful to treat fairly all major user, retailer, and product categories.
even if the model has high avg test accuracy but for example it ignores the small busnisess and give all recommendations 
from bigh retailer that could harm these bussinesses and of course you would lose these clients

## Unfortunate conversation in many companies

![meme](https://user-images.githubusercontent.com/40968723/190280869-503868f2-6cb0-464a-a11e-2411be24ed5e.jpg)

## Need for a baseline
.
.
.
.
_____________________________________________________________________________

What Is a Baseline? A baseline is a fixed point of reference that is used for comparison purposes.
in machine learning it's important to establish a baseline to know where your model's performance stands compared to a human level performance or another deployed model

### Speech recognition example
for example if we have a speech recognition model that performs as following, you might notice that the lowest accuracy is low Bandwidth type(meaning the signal is weak and the voice not very clear) so you attempt to improve its performance on this type
but before you do this you remember to establish a baseline first so you find that even the human level performance can't achieve any higher than this
that's why it's important to establish a basline, because if you didn't you would have been wasting your time in a task that doesn't even have margin for improvement.

![image](https://user-images.githubusercontent.com/40968723/201443924-17ad720d-065b-48d1-b606-58d23e5fe15e.png)

Ways to establish a baseline
- Human level performance (HLP) especially in unstructured data
- Literature search for state-of-the-art/open source
- Older system

Baseline gives an estimate of the irreducible error / Bayes error and indicates
what might be possible.

{% include {{ page.chart_html }} %}

