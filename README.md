# Markdown Hosted

You can host your markdown files here! Actually, you can host any HTML files.

## Let's Start
Convert your markdown file to HTML, suppose it is named `mymarkdown.html`.

Run the following command to host it:
```bash
curl -X POST https://markdownhosted.org --data-binary @mymarkdown.html
```

The server will response with a 302 redirect to the hosted file, and URL to the hosted file in body as well.

```http
HTTP/1.1 302 Found
Location: https://markdownhosted.org/63ee00ed67b3fb42fbb464f7b943ab9ad05937c76eb17108604173339315d83f

https://markdownhosted.org/63ee00ed67b3fb42fbb464f7b943ab9ad05937c76eb17108604173339315d83f

```

The URL path is the SHA-256 hash of the file content.

## FAQ
### Who can access the file?
Anyone who knows the URL. If someone knows the SHA-256 if your HTML file, they can access it.

So, please make sure don't include credentials, personal information, or any sensitive information you don't want to disclose in the file.

### How long will the file be hosted?
Forever. The server won't delete the file unless the server is down.

### Can I delete the file?
Short answer: No. There is no API interface to delete the file.

The server won't know who the uploader is. The server doesn't store any information about the uploader. You can't prove your identity with the SHA-256 hash.

There are some rare conditions that you can request a file deletion, including personal information leakage, intellectual property infringement, improper or illegal content, etc. You can contact the administrator with the SHA-256 hash of the file and the reason for deletion.

Please note that if you forget the SHA-256 hash of the file, you can never delete it.

### What content can I upload?
Any binary starts with `<!DOCTYPE html>` and less than 50 MiB.

For non-standard HTML files that not starts with `<!DOCTYPE html>` (like HTML4), the server won't accept it.

As of the file upload policy, please, don't upload content like:
 - **Illegal content**, including drugs, violence, crime, etc.
 - **Personal information**, including real names, email address, phone numbers, physical addresses, etc. Both your won and others should not be uploaded.
 - **Copyrighted content**, any content that may infringe on the intellectual property rights of others.
 - **Malicious content**, including malware, phishing, viruses, or any content that includes script or code that may harm the user's device.
 - **Executable files**, anything executable, including binary executables, scripts, etc. **You should not upload a JavaScript file, nor a HTML file with JavaScript code.**
 - **Scam or fraud content**, including Ponzi schemes, pyramid schemes, etc.
 - **Spams**, including any content that is irrelevant or unsolicited.
 - **Advertisement**, including any content that is intended to promote a product or service.
 - **Hate speech**, including any content that promotes hate speech, discrimination, or violence against individuals
 - **Political content**, including any content that promotes political propaganda, or any content that may cause political disputes.
 - **NSFW content**, including any content that is not safe for work, including adult content, gore, etc.

### Can I report abuse?
Yes. Please contact the administrator with the SHA-256 hash of the file and the reason for deletion.

### Can I upload a HTML with JavaScript code?
Technically, yes. But you should consider twice. Make sure the JavaScript code is safe and won't harm the user's device.

### Can I upload a HTML with CSS code?
Yes!

### How to contact the administrator?
Please contact the administrator via email: `report@markdownhosted.org`.

### How to setup auto upload in Typora?
Check **Run custom command** in Typora settings, and add the following command:
```bash
curl -SsfX POST https://markdownhosted.org --data-binary "@${outputPath}"
```

### Can I host my own markdownhosted.org server?
Yes! we host on Cloudflare Workers. You can deploy your own server by clicking the following button:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/baobao1270/markdown-hosted)

## License
The project is under the MIT license.
