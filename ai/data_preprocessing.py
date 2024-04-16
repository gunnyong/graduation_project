from PIL import Image, ImageOps, ImageEnhance
import numpy as np
import os


def augment_image(img, variant):
    img = img.rotate(variant * 90)  # 회전
    if variant % 2 == 0:
        img = ImageOps.mirror(img)  # 좌우 반전
    enhancer = ImageEnhance.Brightness(img)
    brightness_factor = 0.75 + variant * 0.15
    img = enhancer.enhance(brightness_factor)
    return img

def crop_to_square(img):
    short_side = min(img.size)
    left = (img.width - short_side) / 2
    top = (img.height - short_side) / 2
    right = (img.width + short_side) / 2
    bottom = (img.height + short_side) / 2
    return img.crop((left, top, right, bottom))

def process_images_in_directory(directory, size=(256, 256)):
    data_list = []
    label_list = []

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                path = os.path.join(root, file)
                with Image.open(path) as img:
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                        
                    img = crop_to_square(img).resize(size)
                    
                    # 이미지의 상위 디렉터리명을 레이블로 지정
                    label = os.path.basename(root)
                    
                    # 데이터 증강 후 리스트에 추가
                    for variant in range(4):
                        augmented_img = augment_image(img, variant)
                        augmented_img_np = np.array(augmented_img) / 255.0
                        data_list.append(augmented_img_np)
                        label_list.append(label)

    # 리스트 numpy로 변환
    data_np = np.array(data_list)
    labels_np = np.array(label_list)
    
    return data_np, labels_np

if __name__ == '__main__':
    root_directory = 'aidata'
    data_np, labels_np = process_images_in_directory(root_directory)
    print('Data shape:', data_np.shape)
    print('Labels shape:', labels_np.shape)
    np.save('data.npy', data_np)
    np.save('labels.npy', labels_np)