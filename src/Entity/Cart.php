<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Product;
use App\Entity\Customer;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CartRepository;

/**
 * @ORM\Entity(repositoryClass=CartRepository::class)
 */
class Cart
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @var Customer|null
     *
     * @ORM\OneToOne(targetEntity="Customer")
     */
    private $customer;

    /**
     * @var Collection|Product[]
     *
     * @ORM\ManyToMany(targetEntity="Product")
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Customer|null
     */
    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    /**
     * @param Customer|null $customer
     */
    public function setCustomer(?Customer $customer): void
    {
        $this->customer = $customer;
    }

    /**
     * @return Product[]|Collection
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * @param Product[]|Collection $products
     */
    public function setProducts($products): void
    {
        $this->products = $products;
    }
}
