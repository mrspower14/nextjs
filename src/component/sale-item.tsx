import {type SaleData} from '@/types';  //@:src 
import style from './sale-item.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function SaleItem({ id, productName, description, price, photo } : SaleData) {

    const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${photo}`;

    return (
        <Link href={`/sale/${id}`} className={style.container}>
            <Image src={imageURL} alt={`${productName}의 사진`} width={100} height={100} className={style.image} />
            <div>
                <div className={style.title}>{productName}</div>
                <div className={style.description}>{description}</div>
                <div className={style.price}>{price.toLocaleString()}원</div>
            </div>
        </Link>
    );
}