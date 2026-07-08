from PIL import Image

def make_favicons(input_path, icon_png_path, favicon_ico_path):
    img = Image.open(input_path)
    width, height = img.size
    
    # Make it square
    max_dim = max(width, height)
    square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    x_offset = (max_dim - width) // 2
    y_offset = (max_dim - height) // 2
    square_img.paste(img, (x_offset, y_offset))
    
    # 1. Save as 512x512 PNG (for app/icon.png)
    resized_512 = square_img.resize((512, 512), Image.Resampling.LANCZOS)
    resized_512.save(icon_png_path, "PNG")
    print(f"Successfully saved square PNG to {icon_png_path}")
    
    # 2. Save as multi-size ICO (for app/favicon.ico)
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    square_img.save(favicon_ico_path, format="ICO", sizes=icon_sizes)
    print(f"Successfully saved multi-size ICO to {favicon_ico_path}")

if __name__ == "__main__":
    make_favicons(
        "public/logo-transparent.png",
        "app/icon.png",
        "app/favicon.ico"
    )
