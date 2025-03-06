const Customerissue = require('../model/customerIssuesmodel');
const { json } = require('sequelize');

async function postIssue(req, res) {
    try {
        const { userId, issue } = req.body;
        const newIssue = await Customerissue.create({ userId, issue });
        res.status(200).json({ msg: "Customer issue posted", data: newIssue })
    } catch (err) {
        console.log("error occured ", err);
        res.status(400).json({ msg: 'error occured' })
    }
}

async function getIssueList(req, res) {
    try {
        const { userId } = req.body;
        const IssueList = await Customerissue.findAll({ where: { userId: userId } });
        res.status(200).json({ msg: "Customer issue list fetched successfully", data: IssueList })
    } catch (err) {
        console.log("error occured ", err);
        res.status(400).json({ msg: 'error occured' })
    }
}

async function getAllIssueList(req, res) {
    try {
        const { userId } = req.query;
        const filter = userId ? { where: { userId: userId.toString() } } : {};

        const IssueList = await Customerissue.findAll(filter).catch(err => {
            throw new Error("Database error while fetching all issues");
        });

        res.status(200).json({ msg: "Customer issue list fetched successfully", data: IssueList });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ msg: err.message || "Error occurred while fetching all issues" });
    }
}

async function deleteIssue(req, res) {
    try {
        const { issueId } = req.params; // Use req.params instead of req.body

        if (!issueId) {
            return res.status(400).json({ msg: "Issue ID is required" });
        }

        const issue = await Customerissue.findByPk(Number(issueId)).catch(err => {
            throw new Error("Database error while finding issue");
        });

        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }

        await issue.destroy().catch(err => {
            throw new Error("Database error while deleting issue");
        });

        res.status(200).json({ msg: "Issue deleted successfully" });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ msg: err.message || "Error occurred while deleting the issue" });
    }
}

module.exports = { postIssue, getIssueList, getAllIssueList, deleteIssue };
