// checkCoordinatesValidity.js
export default function checkCoordinatesValidity(inputValue) {
    let newValue;
    const validObj = {};
    if (inputValue.startsWith('[') && inputValue.endsWith(']')) {
      newValue = inputValue.slice(1, inputValue.length - 1).split(',');
    } else {
      newValue = inputValue.split(',');
    }
  
    if (newValue.length !== 2) return validObj;
    const lat = parseFloat(newValue[0].trim());
    const lng = parseFloat(newValue[1].trim());
  
    if (!Number.isNaN(lat) && Math.abs(lat) <= 90) {
      validObj.lat = lat;
    }
    if (!Number.isNaN(lng) && Math.abs(lng) <= 180) {
      validObj.lng = lng;
    }
    return validObj;
  }
  

  import checkCoordinatesValidity from '../checkCoordinatesValidity';
  
  test('Coords OK with space', () => {
    const input = '-89.132, 179.123';
    const expected = { lat: -89.132, lng: 179.123 };
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords OK with space and brackets', () => {
    const input = '[89.132, -179.123]';
    const expected = { lat: 89.132, lng: -179.123 };
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords OK without space', () => {
    const input = '[0.132,1.123]';
    const expected = { lat: 0.132, lng: 1.123 };
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords OK without space and brackets', () => {
    const input = '0,0';
    const expected = { lat: 0, lng: 0 };
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK with space', () => {
    const input = '-91, 181';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK with space and brackets', () => {
    const input = '[91, -181]';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK without space', () => {
    const input = '[91,-181]';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK without space and brackets', () => {
    const input = '91,181';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK - NaN 2', () => {
    const input = 'abc,def';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK - NaN', () => {
    const input = 'abc';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK - empty', () => {
    const input = '';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  
  test('Coords not OK - empty space', () => {
    const input = ' ';
    const expected = {};
    expect(checkCoordinatesValidity(input)).toEqual(expected);
  });
  