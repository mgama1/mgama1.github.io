---
layout: post
title: "Hiding in plain sight: An introduction into Steganography and cryptography"
---

More than 24 centuries ago, a Greek ruler named Histiaeus needed to send a secret message to his ally, Aristagoras. A pigeon wasn't going to cut it, so he got a little creative. He summoned his most loyal slave, shaved the man’s head, and wrote the message on his scalp. After bandaging the slave's head, Histiaeus waited until the hair grew back, then sent him on his way to deliver the message.


This unusual method of concealing a message is considered the first recorded use of steganography. From that point onward, our methods only grew more creative. As new forms of media emerged, the techniques for hiding messages in plain sight hasevolved right alongside them.



![img](https://www.tattoolife.com/wp-content/uploads/2021/11/Detail-of-an-illustration-by-Giorgio-De-Gaspari.jpeg)
 

Since then we have come a long way, from hiding messages on a literal man's head to writing with invisible ink (thankfully on paper) or encapsulating the secret message in the first letter of every word, more generally known as null cipher

<div style="text-align:center">
  <img src="https://i.imgur.com/5fnUjMQ.png" alt="img"/>
</div>



But what if you don't have a slave to write on his head or can't craft a seemingly innocent essay that perfectly fits the message in its correct place?
Well you are in luck, since the age of computers, now we don't have to hide messages in physical items, we can embed messages in countless formats like images, videos, or sound files, in this article we will discuss how to hide a secret message subtly in any image,
but before we start let's refresh some concepts

let's zoom in all the way to one pixel of this samurai image
![img](https://i.imgur.com/1jbilJc.jpeg)


it's kind of pink, right?

As you probably know, most images consist of three channels, red, green and blue, and these values add up give you some unique color, most images are also 8bit, meaning that every pixel can have a value from 0 to 255.
one of these squares is identical to our chosen pixel above and the other i have altered its red channel by 1,can you tell which is which?

![img](https://i.imgur.com/uDYktMP.jpeg)

i'm guessing here that you don't have superpowers and that you can't, especially without the zoom in, so we can actually leverage this to 
to easily embed a secret message in any digital image without raisng suspicions, probably....
> Disclaimer: changing the values of pixels can change the image's statstical distributions, so if the change is big enough and/or a steganalyst is clever enough, it can be detected 

Now buckle up because things are going to get more technical
As we mentioned earlier, all pixels are ranged from 0 to 255 and this can be represented by 8bits in binary system, so what we did is just modifying the least significant bit




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .container {
            display: flex;
            gap: 10px;
        }
        .square {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid black;
            font-size: 24px;
            font-weight: bold;
        }
        .black {
            color: black;
        }
        .red {
            color: red;
        }
    </style>
    <title>Bit Sequence</title>
</head>
<body>

<div class="container">
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square red">0</div>
</div>
<br>

<div class="container">
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square black">0</div>
    <div class="square black">1</div>
    <div class="square red">1</div>
</div>


</body>
</html>
