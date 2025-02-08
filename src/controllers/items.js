let items = [];
let nextId = 1;

const getAllItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

const createItem = (req, res) => {
  const item = {
    id: nextId++,
    name: req.body.name,
    description: req.body.description,
  };
  items.push(item);
  res.status(201).json(item);
};

const updateItem = (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = req.body.name;
  item.description = req.body.description;

  res.json(item);
};

const deleteItem = (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1)
    return res.status(404).json({ error: "Item not found" });

  items.splice(itemIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
