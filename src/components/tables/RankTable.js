import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dataArrExample1 from '../../data/DataExample1.js';

export default function RankTable({ dataArr }) {
  const columns = [
    { field: 'id', headerName: '№', width: 150, editable: false },
    { field: 'X', headerName: 'X', width: 150, editable: false },
    { field: 'Y', headerName: 'Y', width: 150, editable: false },
    { field: 'rankX', headerName: 'Ранги Nx', width: 150, editable: false },
    { field: 'rankY', headerName: 'Ранги Ny', width: 150, editable: false },
    { field: 'd', headerName: 'd = Nx - Ny', width: 150, editable: false },
    { field: 'd^2', headerName: 'd^2', width: 150, editable: false },
  ];

  if (dataArr === null || dataArr.length === 0) {
    dataArr = dataArrExample1;
  }

  function calculateValues(dataArr) {
    // Копия массива данных
    const updatedDataArr = [...dataArr];

    // Вычисление рангов Nx и Ny
    const ranksX = calculateRanks(dataArr, 'X');
    const ranksY = calculateRanks(dataArr, 'Y');

    // Добавление объектов с рангами в массив данных
    updatedDataArr.forEach((obj, index) => {
      obj.rankX = ranksX[obj.id - 1];
      obj.rankY = ranksY[obj.id - 1];
      obj.d = ranksX[obj.id - 1] - ranksY[obj.id - 1];
      obj['d^2'] = (ranksX[obj.id - 1] - ranksY[obj.id - 1]) ** 2;
    });

    const total = {
      id: `n = ${dataArr.length}`,
      d: 'Сумма',
      'd^2': calculateSumD2(updatedDataArr),
    };

    updatedDataArr.push(total);

    return updatedDataArr;
  }

  function calculateRanks(dataArr, field) {
    const sortedData = [...dataArr];

    // Сортировка по полю field в порядке убывания
    sortedData.sort((a, b) => b[field] - a[field]);

    const ranks = Array(sortedData.length).fill(0);
    let currentRank = 1;
    let count = 1;

    for (let i = 0; i < sortedData.length; i++) {
      ranks[sortedData[i].id - 1] = currentRank;

      if (i < sortedData.length - 1 && sortedData[i][field] === sortedData[i + 1][field]) {
        count++;
      } else {
        // Присваивание среднего ранга для повторяющихся значений
        for (let j = i - count + 1; j <= i; j++) {
          ranks[sortedData[j].id - 1] = currentRank + (count - 1) / 2;
        }

        currentRank += count;
        count = 1;
      }
    }

    return ranks;
  }

  function calculateSumD2(dataArr) {
    let sumD2 = 0;
    for (let i = 0; i < dataArr.length; i++) {
      sumD2 += dataArr[i]['d^2'];
    }
    return sumD2;
  }

  const rows = calculateValues(dataArr);

  return (
    <div style={{ height: 630, width: '100%' }}>
      <DataGrid disablePagination rows={rows} columns={columns} />
    </div>
  );
}