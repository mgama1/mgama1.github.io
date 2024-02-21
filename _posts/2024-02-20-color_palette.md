---
layout: post
title: Unlocking the Power of Colors Machine Learning for Image Scene Palettes
---
Have you ever looked very close to an old tv and saw the individual pixels or subpixels that make up the image? you will notice that it's  not a solid source of light that gives you the color that you would see from afar but actually very small and very close but still separated red, blue and green light sources.
this is how all devices show colors but it would much harder to see with a high resolution monitor and if you don't believe it look at this image. this is not a screenshot of a jpeg or png or any other image format that you are used to. it's in fact a spreadsheet and every pixel is represented by three colored cells next to each other

![Screenshot from 2024-02-20 20-02-20](https://github.com/mgama1/mgama1.github.io/assets/40968723/ca93de69-7b67-48f4-a414-54f10e2e3c3c)
[Ana de Armas in the Gray man]

and if you zoom back you will see the individual colors
![Screenshot from 2024-02-20 20-04-34](https://github.com/mgama1/mgama1.github.io/assets/40968723/ca3e116e-8679-49fe-a9ce-ce5e027721b5)

you can try it yourself [here](http://github.andrewt.net/mosaic/)


this is why in all image formats you will usually find 3 channels stacked over each other and each channel is a 2d array 

![image](https://github.com/mgama1/mgama1.github.io/assets/40968723/6da8826d-e965-47f5-966d-3a23857f3c68)

[image from [ Sandeep Balachandran](https://res.cloudinary.com/practicaldev/image/fetch/s--BXoVOWNw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/yyDtW47/own2d.png)]

now that you are now familliar with what images look like let's have a look at arthur fleck after a long day at work
![joker](https://github.com/mgama1/mgama1.github.io/assets/40968723/7fd1674e-c968-4ca0-92f6-128fc12cfe35)


open the image and see what the dimensions look like
```python
image = mpimg.imread('../arthur.jpg')
h,w,d = tuple(image.shape)
print(h,w,d)
```
turns out my image has 394 rows(height), 728 columns(width), and 3 channels(depth)
what we wanna do right now is reshape this tensor so that we have every pixel in rows and each column is its R value, G value and G value in a row
```python
pixels = np.reshape(image, (w * h, d))
```
so this what we essentially have
$$\begin{bmatrix} p_1 \\ p_2  \\ \vdots \\ p_{w*h} \end{bmatrix} = \begin{bmatrix} R_{p_1} & G_{p_1} &  B_{p_1}  \\ R_{p_2} & G_{p_2} &  B_{p_2}  \\ \vdots  & \vdots & \vdots \\ R_{p_{w*h}} & G_{p_{w*h}} &  B_{p_{w*h}} \end{bmatrix}  $$



<div id="plot"></div>

<script>
const imageUrl = 'https://schloss-post.com/content/uploads/joker-official-images-19-600x324.jpeg';

const image = new Image();
image.crossOrigin = 'Anonymous';
image.src = imageUrl;
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
      zaxis: { title: 'B' }
    },
    width: 800,
    height: 800
  };
  
  const data = [trace];
  
  Plotly.newPlot('plot', data, layout);
};

</script>


