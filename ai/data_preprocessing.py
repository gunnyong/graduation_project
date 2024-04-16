from PIL import Image, ImageOps, ImageEnhance
import os

def augment_image(img, variant):
    """이미지 데이터 증강"""
    # 회전
    img = img.rotate(variant * 90)  # 0, 90, 180, 270도 회전

    # 좌우 반전 (첫 번째와 세 번째 변형에만 적용)
    if variant % 2 == 0:
        img = ImageOps.mirror(img)

    # 밝기 조절 (각 변형마다 다른 밝기)
    enhancer = ImageEnhance.Brightness(img)
    brightness_factor = 0.75 + variant * 0.15  # 0.75, 0.90, 1.05, 1.20
    img = enhancer.enhance(brightness_factor)

    return img

def process_images_in_directory(directory, size=(256, 256)):
    for entry in os.listdir(directory):
        full_path = os.path.join(directory, entry)
        if os.path.isdir(full_path):
            process_images_in_directory(full_path, size)
        elif entry.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            with Image.open(full_path) as img:
                img_cropped = crop_to_square(img)
                img_resized = img_cropped.resize(size)
                img_resized.save(full_path)
                # 각 이미지에 대해 4개의 증강된 이미지 생성
                for i in range(4):
                    img_augmented = augment_image(img_resized, i)
                    # 파일명에 변형 번호를 추가하여 저장
                    augmented_filename = f"{os.path.splitext(entry)[0]}_aug_{i}{os.path.splitext(entry)[1]}"
                    augmented_path = os.path.join(directory, augmented_filename)
                    img_augmented.save(augmented_path)
                    print(f"Saved augmented image {augmented_filename}")

def crop_to_square(img):
    """이미지 center-cropping으로 정사각형 변환"""
    short_side = min(img.size)
    left = (img.width - short_side) / 2
    top = (img.height - short_side) / 2
    right = (img.width + short_side) / 2
    bottom = (img.height + short_side) / 2
    return img.crop((left, top, right, bottom))

if __name__ == '__main__':
    root_directory = 'aidata/data_set'
    process_images_in_directory(root_directory)