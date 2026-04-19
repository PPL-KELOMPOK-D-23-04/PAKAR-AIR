import os
import shutil

BASE_PATH = 'dataset/IWHR_AI_Lable_Floater_V1-package2'
IMAGE_PATH = os.path.join(BASE_PATH, 'images')
LABEL_PATH = 'labels'

def move_files(txt_file, dst_img, dst_lbl):
    os.makedirs(dst_img, exist_ok=True)
    os.makedirs(dst_lbl, exist_ok=True)

    with open(txt_file) as f:
        files = f.read().strip().split()

    for name in files:
        # detect gambar
        img_jpg = os.path.join(IMAGE_PATH, f"{name}.jpg")
        img_png = os.path.join(IMAGE_PATH, f"{name}.png")

        if os.path.exists(img_jpg):
            img_src = img_jpg
            ext = ".jpg"
        elif os.path.exists(img_png):
            img_src = img_png
            ext = ".png"
        else:
            print(f"Gambar tidak ditemukan: {name}")
            continue

        lbl_src = os.path.join(LABEL_PATH, f"{name}.txt")

        shutil.copy(img_src, os.path.join(dst_img, name + ext))
        shutil.copy(lbl_src, os.path.join(dst_lbl, name + ".txt"))

# TRAIN
move_files('ImageSets/Main/train.txt', 'dataset/images/train', 'dataset/labels/train')

# VAL
move_files('ImageSets/Main/val.txt', 'dataset/images/val', 'dataset/labels/val')

print("✅ Dataset siap!")