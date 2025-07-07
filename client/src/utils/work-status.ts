import type { WorkStatus } from '../types/work';

export const sortWorkStatus = (works: WorkStatus[]) => {
  return [...works].sort((a, b) => {
    const destinationCompare = a.destination.localeCompare(b.destination);
    if (destinationCompare !== 0) return destinationCompare;
    const businessCompare = a.business.localeCompare(b.business);
    if (businessCompare !== 0) return businessCompare;
    const workCompare = a.work.localeCompare(b.work);
    if (workCompare !== 0) return workCompare;
    const carCompare = a.car.localeCompare(b.car);
    if (carCompare !== 0) return carCompare;
    return a.username.localeCompare(b.username);
  });
};

export const getRowSpans = (items: WorkStatus[]) => {
  const spans = new Map<string, number>();
  let prevName: string | null = null;
  let prevDestination: string | null = null;
  let prevBusiness: string | null = null;
  let prevWork: string | null = null;
  let prevCar: string | null = null;

  let nameSpan = 1;
  let destSpan = 1;
  let businessSpan = 1;
  let workSpan = 1;
  let carSpan = 1;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (
      i > 0 &&
      item.destination === prevDestination &&
      item.username === prevName
    ) {
      nameSpan++;
      spans.set(`${i}-name`, 0);
    } else {
      if (i > 0) {
        spans.set(`${i - nameSpan}-name`, nameSpan);
      }
      nameSpan = 1;
    }

    if (i > 0 && item.destination === prevDestination) {
      destSpan++;
      spans.set(`${i}-destination`, 0);
    } else {
      if (i > 0) {
        spans.set(`${i - destSpan}-destination`, destSpan);
      }
      destSpan = 1;
    }

    if (
      i > 0 &&
      item.business === prevBusiness &&
      item.destination === prevDestination
    ) {
      businessSpan++;
      spans.set(`${i}-business`, 0);
    } else {
      if (i > 0) {
        spans.set(`${i - businessSpan}-business`, businessSpan);
      }
      businessSpan = 1;
    }

    if (
      i > 0 &&
      item.work === prevWork &&
      item.destination === prevDestination
    ) {
      workSpan++;
      spans.set(`${i}-work`, 0);
    } else {
      if (i > 0) {
        spans.set(`${i - workSpan}-work`, workSpan);
      }
      workSpan = 1;
    }

    if (
      i > 0 &&
      item.destination === prevDestination &&
      (item.car === prevCar || item.car === '' || prevCar === '')
    ) {
      carSpan++;
      spans.set(`${i}-car`, 0);
    } else {
      if (i > 0) {
        spans.set(`${i - carSpan}-car`, carSpan);
      }
      carSpan = 1;
    }

    if (i === items.length - 1) {
      if (item.destination === prevDestination) {
        spans.set(`${i - destSpan + 1}-destination`, destSpan);
      } else {
        spans.set(`${i}-destination`, 1);
      }

      if (
        item.business === prevBusiness &&
        item.destination === prevDestination
      ) {
        spans.set(`${i - businessSpan + 1}-business`, businessSpan);
      } else {
        spans.set(`${i}-business`, 1);
      }

      if (item.work === prevWork && item.destination === prevDestination) {
        spans.set(`${i - workSpan + 1}-work`, workSpan);
      } else {
        spans.set(`${i}-work`, 1);
      }

      if (
        (item.car === prevCar || item.car === '' || prevCar === '') &&
        item.destination === prevDestination
      ) {
        spans.set(`${i - carSpan + 1}-car`, carSpan);
      } else {
        spans.set(`${i}-car`, 1);
      }
    }

    prevName = item.username;
    prevDestination = item.destination;
    prevBusiness = item.business;
    prevWork = item.work;
    prevCar = item.car;
  }

  return spans;
};

export const findNonEmptyCarInGroup = (
  data: WorkStatus[],
  currentIndex: number
) => {
  const currentItem = data[currentIndex];

  for (let i = currentIndex; i < data.length; i++) {
    if (
      data[i].destination === currentItem.destination &&
      data[i].business === currentItem.business &&
      data[i].work === currentItem.work &&
      data[i].car !== ''
    ) {
      return data[i].car;
    }
  }

  for (let i = currentIndex; i >= 0; i--) {
    if (
      data[i].destination === currentItem.destination &&
      data[i].business === currentItem.business &&
      data[i].work === currentItem.work &&
      data[i].car !== ''
    ) {
      return data[i].car;
    }
  }

  return '';
};

export const getDestinations = (works: WorkStatus[]) => {
  return Array.from(new Set(works.map((item) => item.destination))).sort(
    (a, b) => a.localeCompare(b)
  );
};

export const getBusinessesByDestination = (
  works: WorkStatus[],
  destination: string
) => {
  return Array.from(
    new Set(
      works
        .filter((item) => item.destination === destination)
        .map((item) => item.business)
    )
  );
};

export const createStyleMap = (works: WorkStatus[]) => {
  const styleMap = new Map<string, { backgroundColor: string }>();
  const bgColors = ['#F8F9FC', '#EEF6FF', '#F2EEFF', '#E6FFEF', '#FFF4E8'];
  const destinations = getDestinations(works);

  destinations.forEach((dest, index) => {
    const colorIndex = index % bgColors.length;
    const color = bgColors[colorIndex];
    const businesses = getBusinessesByDestination(works, dest);

    businesses.forEach((bus, busIndex) => {
      const opacity = 1 - busIndex * 0.2;
      styleMap.set(`${dest}-${bus}`, {
        backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
          color.slice(3, 5),
          16
        )}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`,
      });
    });
  });

  return styleMap;
};

export const shouldRenderCell = (
  rowSpans: Map<string, number>,
  index: number,
  field: string
) => {
  return rowSpans.get(`${index}-${field}`) !== 0;
};

export const getCellContent = (
  item: WorkStatus,
  field: string,
  sortedData: WorkStatus[],
  index: number
) => {
  switch (field) {
    case 'name':
      return item.username;
    case 'destination':
      return item.destination;
    case 'business':
      return item.business;
    case 'work':
      return item.work;
    case 'car':
      return item.car !== ''
        ? item.car
        : findNonEmptyCarInGroup(sortedData, index);
    default:
      return '';
  }
};
