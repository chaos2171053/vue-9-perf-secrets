const listDataSource = [{
  name: "John Brown",
  age: 18,
},
{
  name: "Jim Green",
  age: 24,
},
{
  name: "Joe Black",
  age: 30,
},
{
  name: "Jon Snow",
  age: 26,
}]

function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10);
}

const mockListData = new Array(1000).fill(1).map((item, index) => {
  const user = listDataSource[randomNumber(0, 4)]
  return {
    ...user,
    id: index+1
  }
})

export {
  mockListData
}
