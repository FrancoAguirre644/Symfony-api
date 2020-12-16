<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CategoryController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $categories = $this->getDoctrine()->getRepository(Category::class)->findAll();

        return $this->json($categories);
    }

    public function showAction(Request $request): Response
    {
        $idCategory = $request->get('id');

        $category = $this->getDoctrine()->getRepository(Category::class)->findOneBy(['id' => $idCategory]);

        return $this->json($category);
    }

    public function createAction(Request $request): Response
    {
        $form = $this->buildForm(CategoryType::class);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Category $category */
        $category = $form->getData();

        $this->getDoctrine()->getManager()->persist($category);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($category);
    }

    public function updateAction(Request $request): Response
    {
        $idProduct = $request->get('id');

        $category = $this->getDoctrine()->getRepository(Category::class)->findOneBy(['id' => $idProduct]);

        if (!$category) throw new NotFoundHttpException('the product not exist');

        $form = $this->buildForm(CategoryType::class, $category, [
            'method' => $request->getMethod(),
        ]);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Category $categoryUpdated */
        $categoryUpdated = $form->getData();

        $this->getDoctrine()->getManager()->persist($categoryUpdated);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($categoryUpdated);
    }

    public function deleteAction($id): Response
    {
        $category = $this->getDoctrine()->getRepository(Category::class)->findOneBy(['id' => $id]);

        if (!$category) throw new NotFoundHttpException('Category does not exist');

        $this->getDoctrine()->getManager()->remove($category);
        $this->getDoctrine()->getManager()->flush();

        return $this->json('Category removed successfully');
    }
}
