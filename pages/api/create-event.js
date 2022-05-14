import { Web3Storage, File } from "web3.storage";

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
  try {
    const files = makeFileObjects(body);
    const cid = await storeFiles(files);
    console.log("stored files with cid:", cid);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating event", success: false });
  }
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

function makeFileObjects(body) {
  const buffer = Buffer.from(JSON.stringify(body));

  const files = [new File([buffer], "hello.json")];
  return files;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}
