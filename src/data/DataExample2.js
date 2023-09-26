let data = `1106,452
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
97,43
664,295
940,308
858,315
1074,670
997,325
879,305
609,294
112,82
780,460
2344,1220
835,435
912,215
1764,1227
605,484
2264,1252
1034,861
109,74
780,429
863,275
698,412
174,108
1104,452
598,208
854,353
734,412
684,296
687,433
493,205
234,180
778,453
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
97,43
664,295
940,308
858,315
1074,670
997,325
879,305
609,294
112,82
780,460
2344,1220
835,435
912,215
1764,1227
605,484
2264,1252
109,74
780,429
863,275
698,412`;

let dataArrExample1 = data.split("\n").map(function (line, index) {
  let point = line.split(",");
  return {
    id: index + 1,
    X: parseInt(point[0]),
    Y: parseInt(point[1])
  };
});

export default dataArrExample1;