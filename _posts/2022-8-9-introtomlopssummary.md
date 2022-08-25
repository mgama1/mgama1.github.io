---
layout: post
title: Summary of introduction to Machine Learning in Production
comments: true

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
