<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Component\HttpFoundation\Response;
use App\Controller\AbstractApiController;
use App\Form\ProductType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $products = $this->getDoctrine()->getRepository(Product::class)->findAll();

        return $this->json($products);
    }

    public function getAction($id): Response
    {
        $product = $this->getDoctrine()->getRepository(Product::class)->findOneBy(['id' => $id]);

        return $this->json($product);
    }

    public function createAction(Request $request): Response
    {

        $form = $this->buildForm(ProductType::class);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Product $product */
        $product = $form->getData();

        $this->getDoctrine()->getManager()->persist($product);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($product);
    }

    public function updateAction(Request $request): Response
    {
        $idProduct = $request->get('idProduct');

        $product = $this->getDoctrine()->getRepository(Product::class)->findOneBy(['id' => $idProduct]);

        if (!$idProduct) throw new NotFoundHttpException('the product not exist');

        $form = $this->buildForm(ProductType::class, $product, [
            'method' => $request->getMethod(),
        ]);

        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Product $productUpdated */
        $productUpdated = $form->getData();

        $this->getDoctrine()->getManager()->persist($productUpdated);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($productUpdated);
    }

    public function deleteAction($id): Response
    {
        $product = $this->getDoctrine()->getRepository(Product::class)->findOneBy(['id' => $id]);

        if (!$product) throw new NotFoundHttpException('Product does not exist');

        $this->getDoctrine()->getManager()->remove($product);
        $this->getDoctrine()->getManager()->flush();

        return $this->json('Product removed successfully');
    }
}
