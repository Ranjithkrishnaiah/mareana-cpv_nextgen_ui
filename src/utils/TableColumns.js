export const tableColumns = (item) => {
  let objkeys =
    item !== undefined && item.length > 0 ? Object.keys(item[0]) : [];

  let column = [];
  objkeys &&
    objkeys.map((val, i) => {
      column.push({
        title: val.toUpperCase(),
        dataIndex: val,
        key: `${val}-${i}`,
      });
    });

  return column;
};
