const myTags = [ 'Machine learning' ,' Deep Learning' , 'Data visualization', ' OOP ',' Embedded systems' ,'Control systems', 'Python' , 'C' , 'scikit‑learn', 'Seaborn', 'LATEX', 'Git' , 'TensorFlow', 'Pandas' ,'MATLAB/SIMULINK'
,'AVR'
];

var tagCloud = TagCloud('.content', myTags,{

  // radius in px
  radius: 200,

  // animation speed
  // slow, normal, fast
  maxSpeed: 300,
  initSpeed: 'fast',

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,
  
  // interact with cursor move on mouse out
  keep: false
  
});

