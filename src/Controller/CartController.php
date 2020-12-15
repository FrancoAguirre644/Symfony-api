<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Cart;
use App\Entity\Customer;
use App\Form\CartType;
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

    public function createAction(Request $request): Response
    {

        $form = $this->buildForm(CartType::class);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Cart $cart */
        $cart = $form->getData();

        $this->getDoctrine()->getManager()->persist($cart);
        $this->getDoctrine()->getManager()->flush();

        return $this->respond($cart);
    }

    public function updateAction(Request $request): Response
    {
        $idCustomer = $request->get('idCustomer');

        $customer = $this->getDoctrine()->getRepository(Customer::class)->findOneBy(['id' => $idCustomer]);

        if (!$customer) throw new NotFoundHttpException('customer not found');

        $cart = $this->getDoctrine()->getRepository(Cart::class)->findOneBy(['customer' => $customer]);

        if (!$cart) throw new NotFoundHttpException('the cart not exist for this customer');

        $form = $this->buildForm(CartType::class, $cart, [
            'method' => $request->getMethod(),
        ]);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Cart $cart */
        $cart = $form->getData();

        $this->getDoctrine()->getManager()->persist($cart);
        $this->getDoctrine()->getManager()->flush();

        return $this->respond($cart);
    }

    public function deleteAction(Request $request): Response
    {

        $idCustomer = $request->get('idCustomer');
        $idCart = $request->get('idCart');

        $cart = $this->getDoctrine()->getRepository(Cart::class)->findOneBy(['id' => $idCart, 'customer' => $idCustomer]);

        if (!$cart) throw new NotFoundHttpException('Cart does not exist');

        $this->getDoctrine()->getManager()->remove($cart);
        $this->getDoctrine()->getManager()->flush();

        return $this->json('cart removed successfully');
    }
}
