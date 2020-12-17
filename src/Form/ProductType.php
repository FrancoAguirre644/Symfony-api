<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\Product;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ProductType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('code', TextType::class, [
                'constraints' => [
                    new NotNull(),
                ]
            ])
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotNull(),
                ]
            ])
            ->add('description', TextType::class, [
                'constraints' => [
                    new NotNull(),
                ]
            ])
            ->add('price', NumberType::class, [
                'constraints' => [
                    new NotNull(),
                    new GreaterThan([
                        'value' => 0
                    ]),
                ]
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'constraints' => [
                    new NotNull(),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Product::class,
        ]);
    }
}
