---
layout: post
title: Unlocking the Power of Colors Machine Learning for Image Scene Palettes
---
Have you ever looked very close to an old tv and saw the individual pixels or subpixels that make up the image? you will notice that it's  not a solid source of light that gives you the color that you would see from afar but actually very small and very close but still separated red, blue and green light sources.
this is how all devices show colors but it would much harder to see with a high resolution monitor and if you don't believe it look at this image. this is not a screenshot of a jpeg or png or any other image format that you are used to. it's in fact a spreadsheet and every pixel is represented by three colored cells next to each other
![Screenshot from 2024-02-21 17-01-30](https://github.com/mgama1/mgama1.github.io/assets/40968723/ee1f466f-bd78-45b0-822e-6a86d3ed2c5f)
[James McAvoy as Patricia, Dennis, Hedwig, The Beast, Barry, Heinrich, Jade, Ian, Mary Reynolds, Norma, Jalin, Kat, B.T., Kevin Wendell Crumb, Mr. Pritchard, Felida, Luke, Goddard, Samuel, Polly et al. in [Glass (2019)](https://www.imdb.com/title/tt6823368/mediaviewer/rm1132094464?ft0=name&fv0=nm0564215&ft1=image_type&fv1=still_frame&ref_=tt_ch)]



and if you zoom in you can see the individual colors
![image](https://github.com/mgama1/mgama1.github.io/assets/40968723/b7ce6cbe-db60-4578-9a11-7bbba35be362)

you can try it yourself [here](http://github.andrewt.net/mosaic/)


this is why in all image formats you will usually find 3 channels stacked over each other and each channel is a 2d array 
with pixel values ranging from 0 to 255.
![image](https://github.com/mgama1/mgama1.github.io/assets/40968723/6da8826d-e965-47f5-966d-3a23857f3c68)

[image from [ Sandeep Balachandran](https://res.cloudinary.com/practicaldev/image/fetch/s--BXoVOWNw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/yyDtW47/own2d.png)]

now that you are now familliar with what images look like let's have a look at arthur fleck after a long day at work
![joker](https://github.com/mgama1/mgama1.github.io/assets/40968723/7fd1674e-c968-4ca0-92f6-128fc12cfe35)
[Joaquin Phoenix as arthur fleck in [joker(2019)](https://www.imdb.com/title/tt7286456/mediaviewer/rm2020643841/)]

open the image and see what the dimensions look like
```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

image = mpimg.imread('../arthur.jpg')
h,w,d = tuple(image.shape)
print(h,w,d)
```
turns out my image has 394 rows(height), 728 columns(width), and 3 channels(depth)
what we wanna do right now is reshape this tensor so that we have every pixel in rows and each column is its R value, G value and B value in a row
```python
pixels = np.reshape(image, (w * h, d))
```
so this what we essentially have
$$\begin{bmatrix} p_1 \\ p_2  \\ \vdots \\ p_{w*h} \end{bmatrix} = \begin{bmatrix} R_{p_1} & G_{p_1} &  B_{p_1}  \\ R_{p_2} & G_{p_2} &  B_{p_2}  \\ \vdots  & \vdots & \vdots \\ R_{p_{w*h}} & G_{p_{w*h}} &  B_{p_{w*h}} \end{bmatrix}  $$


to understand the colors of the image. let's go ahead and plot these pixels. since each pixel $$P^{(i)} \in \mathbb{R}^3$$. we are gonna need a 3d plot where each axis represents R , G , B respectively 
Upon exploring the plot we notice that there are distinct clusters of colors like orange that belongs to his jacket,teal that belongs to the bus and that shade of gray of the road.

<div id="plot"></div>
<script>
const image = new Image();
image.src = 'https://i.imgur.com/BHsT2Un.jpg'; // Replace 'https://example.com/joker.jpg' with the actual URL of your image
image.crossOrigin = 'Anonymous'; // Set crossOrigin to 'Anonymous' to allow access to the image's pixel data
image.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  const pixels = [];
  for (let i = 0; i < imageData.length; i += 4) {
    pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
  }
  
  const sampleIndices = [];
  while (sampleIndices.length < 2000) {
    const index = Math.floor(Math.random() * pixels.length);
    if (!sampleIndices.includes(index)) {
      sampleIndices.push(index);
    }
  }
  
  const sampledPixels = sampleIndices.map(index => pixels[index]);
  
  const colors = sampledPixels.map(rgb => `rgb(${rgb.join(',')})`);
  
  const rgbStrings = sampledPixels.map(rgb => `R: ${rgb[0]}, G: ${rgb[1]}, B: ${rgb[2]}`);
  
  const trace = {
    x: sampledPixels.map(rgb => rgb[0]),
    y: sampledPixels.map(rgb => rgb[1]),
    z: sampledPixels.map(rgb => rgb[2]),
    mode: 'markers',
    marker: {
      size: 3,
      color: colors
    },
    text: rgbStrings,
    type: 'scatter3d'
  };
  
 const layout = {
  scene: {
    xaxis: { title: 'R' },
    yaxis: { title: 'G' },
    zaxis: { title: 'B' },
    camera: {
      eye: { x: 0, y: -1, z: 0 }, // Initial position of the camera
      center: { x: 0, y: 0, z: 0 }, // Point the camera is looking at
      up: { x: 0, y: 0, z: 1 } // Up direction of the camera
    }
  },
  width: 800,
  height: 800
};
  
  const data = [trace];
  
  Plotly.newPlot('plot', data, layout);
};

</script>

if only we can identify these clusters and maybe take the mean of the of each cluster to get the average cluster color ...hey wait that's K-means clustering! 
if you are not familiar with k-means or need a refresher,
k-means is an unsupervised learning algorithm meaning that we don't have labels to out input, just like our pixels, generally speaking,
given a set $$S = x^{(1)},x^{(2)}, \ldots , x^{(n)} ; x^{(i)} \in \mathbb{R}^d $$ 
- initialize cluster centroids(means) $$ \mu _1,\mu _2, \ldots ,\mu _k \in \mathbb{R}^d $$ randomly
- then Repeat until convergence:
  - for every i, set $$C^{(i)} := argmin \| x^{(i)} -\mu _j \|^2 $$
  - for every j, set $$\mu _j := \frac{\sum_{i=1}^n 1 \{c^{(i)}=j\} x^{(i)} }{\sum_{i=1}^n 1 \{c^{(i)}=j\}} $$

this is just a facncy way to say let every point to belong to the cluster with the nearest centroid then recalculate the cluster means.
you can check [statquest](https://www.youtube.com/watch?v=4b5d3muPQmA&t=113s) for an awesome explaination of the algorithm
SO back to the code 
all we have to do is fit the pixels to the K-means model, where the number of clusters is the number of colors in the palette that we want. and just like that their centroids are the colors of the palette
for a more visually pleasing palette we will sort it by hue
```python
from sklearn.cluster import KMeans
import colorsys

def RGB2HSL(rgb):
    r, g, b = rgb / 255.0
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return [h, l, s]

n_colors = 10
model = KMeans(n_clusters=n_colors,random_state=42).fit(pixels)
palette = np.uint8(model.cluster_centers_)
palette_hsl = [RGB2HSL(color) for color in palette]
palette_sorted = [color for _, color in sorted(zip([hsl[0] for hsl in palette_hsl], palette))]

plt.imshow(image)
plt.show()
plt.imshow([palette_sorted])

for i, color in enumerate(palette):
    plt.text(i, 0, RGB2HEX(color), color='black', ha='center', va='center', fontsize=6)
plt.show()
```

And finally!

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {box-sizing: border-box}
body {font-family: Verdana, sans-serif; margin:0}
.mySlides {display: none}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #000000;
  background-color:#ffffff;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: -14px;
  width: 100%;
  text-align: center;
}

/* Number text (1/4 etc) */
.numbertext {
  color: #000000;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
</style>
</head>
<body>

<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 5</div>
  <img src="https://i.imgur.com/tsSGlj2.jpg" style="width:100%">
  <div class="text">Joaquin Phoenix as arthur fleck in joker(2019)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 5</div>
  <img src="https://i.imgur.com/zW1uBDA.png" style="width:100%">
  <div class="text">James McAvoy as The Horde in Glass (2019)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 5</div>
  <img src="https://i.imgur.com/q2csYfT.png" style="width:100%">
  <div class="text">Ana de Armas as Dani Miranda in The Gray Man (2022)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">4 / 5</div>
  <img src="https://i.imgur.com/NSW1cal.png" style="width:100%">
  <div class="text">Kara Hayward as Suzy Bishop in Moonrise Kingdom(2012)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">5 / 5</div>
  <img src="https://i.imgur.com/wWlOsEX.png" style="width:100%">
  <div class="text">Léa Seydoux as Madeleine Swann in No Time to Die (2021)</div>
</div>


<a class="prev" onclick="plusSlides(-1)">❮</a>
<a class="next" onclick="plusSlides(1)">❯</a>

</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
  <span class="dot" onclick="currentSlide(4)"></span> 
  <span class="dot" onclick="currentSlide(5)"></span> 

</div>

<script>
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
</script>

</body>
</html> 
so is this the only way?do i have to use machine learning to do this?
well no, this is just the fun way, for example you can do it programmatically with a couple of line codes
just sort the colors by hue, then take the mean of every 1/k of the sorted pixels 
of course now the computationally expensive part is sorting the whole w*h pixels list

```python
pixels_hsl = [RGB2HSL(color) for color in pixels]
pixels_sorted = np.array([color for _, color in sorted(zip([hsl[0] for hsl in pixels_hsl], pixels), key=lambda x: x[0])])

palette = []
step = len(pixels_sorted_np) // 10
for i in range(9):
    mean_color = pixels_sorted_np[i * step: (i + 1) * step].mean(axis=0)
    mean_color_int = tuple(map(int, mean_color))
    palette.append(mean_color_int)

plt.imshow(image)
plt.show()
plt.imshow([palette])

for i, color in enumerate(palette):
    plt.text(i, 0, RGB2HEX(color), color='black', ha='center', va='center', fontsize=6)
plt.show()
```

And although this is faster on my machine and probably on yours too, the flaw in this method is that we groups pixels based on their hue component only, not their full color representation. This could lead to less accurate results compared to the K-means clustering approach, which considers all three RGB components.



<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {box-sizing: border-box}
body {font-family: Verdana, sans-serif; margin:0}
.mySlides {display: none}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #000000;
  background-color:#ffffff;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: -14px;
  width: 100%;
  text-align: center;
}

/* Number text (1/4 etc) */
.numbertext {
  color: #000000;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
</style>
</head>
<body>

<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 5</div>
  <img src="https://i.imgur.com/sCjH5mT.png" style="width:100%">
  <div class="text">Joaquin Phoenix as arthur fleck in joker(2019)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 5</div>
  <img src="https://i.imgur.com/hfkeajH.png" style="width:100%">
  <div class="text">James McAvoy as The Horde in Glass (2019)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 5</div>
  <img src="https://i.imgur.com/YJuDx51.png" style="width:100%">
  <div class="text">Ana de Armas as Dani Miranda in The Gray Man (2022)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">4 / 5</div>
  <img src="https://i.imgur.com/elsnYxn.png" style="width:100%">
  <div class="text">Kara Hayward as Suzy Bishop in Moonrise Kingdom(2012)</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">5 / 5</div>
  <img src="https://i.imgur.com/FTzMssy.png" style="width:100%">
  <div class="text">Léa Seydoux as Madeleine Swann in No Time to Die (2021)</div>
</div>


<a class="prev" onclick="plusSlides(-1)">❮</a>
<a class="next" onclick="plusSlides(1)">❯</a>

</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
  <span class="dot" onclick="currentSlide(4)"></span> 
  <span class="dot" onclick="currentSlide(5)"></span> 

</div>

<script>
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
</script>

</body>
</html> 


