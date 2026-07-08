from PIL import Image, ImageEnhance, ImageFilter

def brighten_and_glow(input_path, output_path, brightness_factor=1.4, contrast_factor=1.3, glow_color=(255, 255, 255, 120), glow_radius=3):
    # Load transparent image
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Enhance Brightness and Contrast
    # Enhance color/brightness
    enhancer_b = ImageEnhance.Brightness(img)
    img_bright = enhancer_b.enhance(brightness_factor)
    
    # Enhance contrast
    enhancer_c = ImageEnhance.Contrast(img_bright)
    img_enhanced = enhancer_c.enhance(contrast_factor)
    
    # 2. Add an outer glow (white/light-grey) so it stands out on dark tabs
    width, height = img_enhanced.size
    
    # Create a white canvas matching the shape of the alpha channel for the glow
    alpha = img_enhanced.split()[-1]
    
    # Dilate/Expand the alpha mask to make the glow wider than the logo
    # MaxFilter will expand the non-zero alpha values outward
    expanded_alpha = alpha.filter(ImageFilter.MaxFilter(5))
    
    # Create the glow image: solid white (or glow_color) with the expanded alpha mask
    glow_img = Image.new("RGBA", (width, height), glow_color)
    glow_img.putalpha(expanded_alpha)
    
    # Blur the glow to make it soft and look like a real glow
    glow_blurred = glow_img.filter(ImageFilter.GaussianBlur(glow_radius))
    
    # Paste the enhanced logo on top of the blurred glow
    final_img = Image.alpha_composite(glow_blurred, img_enhanced)
    
    # Save the brightened logo
    final_img.save(output_path, "PNG")
    print(f"Saved brightened logo with glow to {output_path}")

if __name__ == "__main__":
    # First, let's create a brightened version of the logo
    brighten_and_glow(
        "public/logo-transparent.png",
        "public/logo-transparent-bright.png",
        brightness_factor=1.5,
        contrast_factor=1.3,
        glow_color=(255, 255, 255, 160), # semi-transparent white glow
        glow_radius=4
    )
