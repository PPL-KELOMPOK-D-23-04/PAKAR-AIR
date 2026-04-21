"""VOC converted to YOLO (FIXED)"""
import xml.etree.ElementTree as ET
import os

sets = ['train', 'val', 'test']
classes = ['floater']

BASE_PATH = 'dataset/IWHR_AI_Lable_Floater_V1-package2'
ANNOTATION_PATH = os.path.join(BASE_PATH, 'Annotations')
IMAGE_PATH = os.path.join(BASE_PATH, 'images')
LABEL_PATH = 'labels'

os.makedirs(LABEL_PATH, exist_ok=True)


def convert(size, box):
    dw = 1. / size[0]
    dh = 1. / size[1]

    x = (box[0] + box[1]) / 2.0 - 1
    y = (box[2] + box[3]) / 2.0 - 1
    w = box[1] - box[0]
    h = box[3] - box[2]

    return x * dw, y * dh, w * dw, h * dh


def convert_annotation(image_id):
    xml_file = os.path.join(ANNOTATION_PATH, f"{image_id}.xml")
    txt_file = os.path.join(LABEL_PATH, f"{image_id}.txt")

    if not os.path.exists(xml_file):
        print(f"❌ XML not found: {xml_file}")
        return

    tree = ET.parse(xml_file)
    root = tree.getroot()

    size = root.find('size')
    w = int(size.find('width').text)
    h = int(size.find('height').text)

    with open(txt_file, 'w') as out_file:
        for obj in root.iter('object'):
            difficult = obj.find('difficult').text
            cls = obj.find('name').text

            if cls not in classes or int(difficult) == 1:
                continue

            cls_id = classes.index(cls)
            xmlbox = obj.find('bndbox')

            b = (
                float(xmlbox.find('xmin').text),
                float(xmlbox.find('xmax').text),
                float(xmlbox.find('ymin').text),
                float(xmlbox.find('ymax').text)
            )

            # clamp
            b = (min(b[0], w), min(b[1], w), min(b[2], h), min(b[3], h))

            bb = convert((w, h), b)
            out_file.write(f"{cls_id} {' '.join(map(str, bb))}\n")


# 🔥 MAIN LOOP
for image_set in sets:
    print(f"Processing: {image_set}")

    txt_path = f'ImageSets/Main/{image_set}.txt'
    if not os.path.exists(txt_path):
        print(f"❌ Missing: {txt_path}")
        continue

    image_ids = open(txt_path).read().strip().split()
    list_file = open(f'{image_set}.txt', 'w')

    for image_id in image_ids:
        # auto detect ekstensi gambar
        img_path_jpg = os.path.join(IMAGE_PATH, f"{image_id}.jpg")
        img_path_png = os.path.join(IMAGE_PATH, f"{image_id}.png")

        if os.path.exists(img_path_jpg):
            img_path = img_path_jpg
        elif os.path.exists(img_path_png):
            img_path = img_path_png
        else:
            print(f"❌ Image not found: {image_id}")
            continue

        list_file.write(os.path.abspath(img_path) + '\n')
        convert_annotation(image_id)

    list_file.close()

print("✅ Conversion done!")