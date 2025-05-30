export default (title, body, image, buttonText, buttonLink) => {
  const emailTitle = title ? `${title}\n\n` : '';

  const emailBody = body ? `${body}\n\n` : '';

  const emailImage = image ? `[Image: ${image}]\n\n` : '';

  const emailButton =
    buttonText && buttonLink ? `${buttonText}: ${buttonLink}\n\n` : '';

  const email = `
${emailTitle}${emailBody}${emailImage}${emailButton}
Thanks again,
Dan
\n\n
---
\n\n
Daniel Aagentah | Founder
Rendah Mag Ltd.
rendahmag.com | dan@rendahmag.com
`;

  return email;
};
