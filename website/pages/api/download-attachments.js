import archiver from 'archiver';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { attachments } = req.body;

    if (!attachments || attachments.length === 0) {
      return res.status(400).json({ error: 'No attachments provided' });
    }

    // Set headers for the response
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=attachments.zip'
    );
    res.setHeader('Content-Type', 'application/zip');

    // Initialize archiver
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Set the compression level
    });

    // Handle any errors from archiver
    archive.on('error', (err) => {
      throw err;
    });

    // Pipe the archive data to the response
    archive.pipe(res);

    // Fetch each attachment and append it to the archive
    for (const attachment of attachments) {
      const response = await fetch(attachment.file);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${attachment.file}`);
      }
      archive.append(response.body, { name: attachment.title });
    }

    // Finalize the archive, which completes the stream
    await archive.finalize();
  } catch (error) {
    console.error('Error generating ZIP file:', error);
    res.status(500).json({ error: 'Failed to generate ZIP file' });
  }
}
