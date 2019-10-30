String cdnImg = imgObj.getJSONObject("guid").getString("rendered");
try{
	if(cdnImg.contains("jpg") || cdnImg.contains("png")){
		AppLog.info(getClass(), "CDN ==== ",cdnImg, getGrant());
		BufferedImage originalImage = ImageIO.read(new URL(cdnImg));
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		if (BufferedImage.TYPE_INT_RGB == originalImage.getType()){
			ImageIO.write(originalImage, "jpg", baos);
			baos.flush();
			byte[] imageInByte = baos.toByteArray();
			baos.close();
			InputStream targetStream = new ByteArrayInputStream(imageInByte);
			DocumentDB thumb = new DocumentDB(null, "default.jpg", targetStream, "McoBlog", "mcoBlogThumbnail", blog.getRowId());
			blog.getField("mcoBlogThumbnail").setDocument(thumb);
		}
		else{
			AppLog.info(getClass(), "getBlog", "THUMBNAIL IS NOT JPEG " + unesTitle, getGrant());
			createDefaultImg(blog);
		}
	}
	else{
		createDefaultImg(blog);
	}
}
