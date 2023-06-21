let data = `666,452
498,208
854,353
734,412
684,296
677,433
493,205
234,190
778,336
538,420
90,57
563,305
744,447
895,530
1480,1030
935,208
676,298
1624,793
1124,861
824,205
474,198
297,112
319,161
97,43`;

let dataArrExample1 = data.split("\n").map(function (line, index) {
  let point = line.split(",");
  return {
    id: index + 1,
    X: parseInt(point[0]),
    Y: parseInt(point[1])
  };
});

export default dataArrExample1;