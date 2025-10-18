import logModel from "../models/logs.model.js";

export const createLog = async (req, res) => {
  try {
    const logs = new logModel(req.body);
    await logs.save();
    res.json(logs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const fetchLog = async (req, res) => {
  try {
    const logs = await logModel.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const fetchLogById = async (req, res) => {
  try {
    const logs = await logModel.findById(req.params.id);

    if (!logs) res.status(404).json({ message: "Logs Not Found !" });

    res.json(logs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateLog = async (req, res) => {
  try {
    const logs = await logModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!logs) res.status(404).json({ message: "Logs Not Found !" });

    res.json(logs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteLog = async (req, res) => {
  try {
    const logs = await logModel.findByIdAndDelete(req.params.id);

    if (!logs) res.status(404).json({ message: "Logs Not Found!" });

    res.json(logs);
  } catch (err) {
    res.status(500).json(err);
  }
};
