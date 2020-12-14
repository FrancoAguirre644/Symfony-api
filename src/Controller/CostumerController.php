<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Costumer;
use App\Form\CostumerType;
use Symfony\Component\HttpFoundation\Request;

class CostumerController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $costumers = $this->getDoctrine()->getRepository(Costumer::class)->findAll();

        return $this->json($costumers);
    }

    public function getAction($id): Response
    {
        $costumer = $this->getDoctrine()->getRepository(Costumer::class)->findOneBy(['id' => $id]);

        return $this->json($costumer);
    }

    public function createAction(Request $request): Response
    {

        $form = $this->buildForm(CostumerType::class);

        $form->handleRequest($request);

        if (!$form->isSubmitted() && !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Costumer $costumer */
        $costumer = $form->getData();

        $this->getDoctrine()->getManager()->persist($costumer);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($costumer);
    }
}
