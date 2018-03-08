console.log('App starting');


setTimeout(() => {
  console.log('Inside callback');
}, 2000);

setTimeout(() => {
  console.log('Seccond timemout works');
}, 0000);


console.log('Finishing up');
