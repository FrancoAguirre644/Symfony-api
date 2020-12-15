<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Cart;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CartController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $carts = $this->getDoctrine()->getRepository(Cart::class)->findAll();

        return $this->json($carts);
    }

    public function showAction(Request $request): Response
    {

        $idCustomer = $request->get('id');

        $customer = $this->getDoctrine()->getRepository(Customer::class)->findOneBy(['id' => $idCustomer]);

        if (!$customer) throw new NotFoundHttpException('customer not found');

        $cart = $this->getDoctrine()->getRepository(Cart::class)->findOneBy(['customer' => $customer]);

        if (!$cart) throw new NotFoundHttpException('the cart not exist for this customer');

        return $this->json($cart);
    }
}
