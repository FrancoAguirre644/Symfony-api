<?php

namespace App\Form;

use App\Entity\Cart;
use App\Entity\Customer;
use App\Entity\Product;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotNull;

class CartType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('customer', EntityType::class, [
                'class' => Customer::class,
                'constraints' => [
                    new NotNull(),
                ],
            ])
            ->add('products', EntityType::class, [
                'class' => Product::class,
                'multiple' => true,
                'constraints' => [
                    new NotNull(),
                ],
            ])
            ->add('date', DateTimeType::class, [
                'constraints' => [
                    new NotNull([
                        'message' => 'date can not be blank',
                    ]),
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Cart::class,
        ]);
    }
}
