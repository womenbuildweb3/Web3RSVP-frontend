import { Web3Storage } from "web3.storage";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createEvent(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function createEvent(req, res) {
  const body = req.body;
  console.log("body", body);
  const cid = await storeFiles(body);
  console.log("stored files with cid:", cid);
  // try {
  //   const cid = await storeFiles(files);
  //   console.log("stored files with cid:", cid);
  //   return res.status(200).json({ success: true });
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ error: "Error creating event", success: false });
  // }
}

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

// function makeFileObjects(body) {
//   const blob = new Blob([JSON.stringify(body)], { type: "application/json" });

//   const files = [new File([blob], "eventdata.json")];
//   return files;
// }
