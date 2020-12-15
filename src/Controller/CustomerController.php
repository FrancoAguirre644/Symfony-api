<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Customer;
use App\Form\CustomerType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CustomerController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $customers = $this->getDoctrine()->getRepository(Customer::class)->findAll();

        return $this->json($customers);
    }

    public function getAction($id): Response
    {
        $customer = $this->getDoctrine()->getRepository(Customer::class)->findOneBy(['id' => $id]);

        return $this->json($customer);
    }

    public function createAction(Request $request): Response
    {

        $form = $this->buildForm(CustomerType::class);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Customer $customer */
        $customer = $form->getData();

        $this->getDoctrine()->getManager()->persist($customer);
        $this->getDoctrine()->getManager()->flush();

        return $this->respond($customer);
    }

    public function updateAction(Request $request): Response
    {
        $idCustomer = $request->get('idCustomer');

        $customer = $this->getDoctrine()->getRepository(Customer::class)->findOneBy(['id' => $idCustomer]);

        if (!$customer) throw new NotFoundHttpException('the customer not exist');

        $form = $this->buildForm(CustomerType::class, $customer, [
            'method' => $request->getMethod(),
        ]);

        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        }

        /** @var Customer $customerUpdated */
        $customerUpdated = $form->getData();

        $this->getDoctrine()->getManager()->persist($customerUpdated);
        $this->getDoctrine()->getManager()->flush();

        return $this->json($customerUpdated);
    }

    public function deleteAction($id): Response
    {
        $customer = $this->getDoctrine()->getRepository(Customer::class)->findOneBy(['id' => $id]);

        if (!$customer) throw new NotFoundHttpException('Costumer does not exist');

        $this->getDoctrine()->getManager()->remove($customer);
        $this->getDoctrine()->getManager()->flush();

        return $this->json('Costumer removed successfully');
    }
}
